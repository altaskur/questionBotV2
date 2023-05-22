// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');
function clickForRemove(event) {
  const lastElement = event.target;

  if (lastElement.classList.contains('crossOut')) {
    console.log('mandando mensaje');
    lastElement.classList.remove('crossOut');
    socket.emit('new', lastElement.textContent);
  } else {
    lastElement.classList.add('crossOut');
    console.log('elimiando mensaje');
    console.log(lastElement.id);
    socket.emit('del', lastElement.id);
  }
}
function newMsg(msg) {
  const articleElement = document.querySelector('article');
  console.log('recived msg', msg);
  const p = document.createElement('p');
  p.textContent = `[${msg.id}] ${msg.displayName}: ${msg.msg}`;
  p.style.transform = 'translateX(100vw)';
  p.id = msg.id;
  p.classList.add('fadeIn');
  p.addEventListener('click', clickForRemove);
  articleElement.appendChild(p);
}
const button = document.querySelector('button');

button.addEventListener('click', () => {
  socket.emit('ping', 'ping');
});

socket.on('connect', () => {
  socket.emit('all');
});

socket.on('ping', () => {
  console.log('Received pong');
});

socket.on('all', (data) => {
  console.log(`Received msg ${data}`);
  data.forEach((msg) => {
    console.log(msg);
    newMsg(msg);
  });
});

socket.on('new', (data) => {
  console.log(`Received msg ${data}`);
  newMsg(data);
});
