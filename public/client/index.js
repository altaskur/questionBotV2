// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');

function newMsg(msg) {
  const articleElement = document.querySelector('article');
  console.log('recived msg', msg);
  const p = document.createElement('p');
  p.textContent = `[${msg.id}] ${msg.displayName}: ${msg.msg}`;
  p.style.transform = 'translateX(100vw)';
  p.classList.add('fadeIn');
  p.id = msg.id;
  articleElement.appendChild(p);
}

function delMsg(id) {
  const p = document.querySelector(`#${id}`);
  if (p) {
    p.classList.remove('fadeIn');
    p.classList.add('fadeOut');

    setTimeout(() => {
      p.remove();
    }, 2200);
  }
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

socket.on('del', (data) => {
  console.log(`Deleting msg ${data}`);
  delMsg(data);
});
