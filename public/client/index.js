// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');

function newMsg(msg) {
  const articleElement = document.querySelector('article');
  console.log('recived msg', msg);
  const newMesg = document.createElement('p');
  newMesg.textContent = `[${msg.id}] ${msg.displayName}: ${msg.msg}`;
  newMesg.style.transform = 'translateX(100vw)';
  newMesg.classList.add('fadeIn');

  articleElement.appendChild(newMesg);
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
