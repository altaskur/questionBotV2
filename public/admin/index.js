// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');
const messages = [];
function clickForRemove(event) {
  const lastElement = event.target;
  if (lastElement.classList.contains('crossOut')) {
    lastElement.classList.remove('crossOut');
    const idNumber = parseInt(lastElement.id, 2);
    const newMessage = messages.filter((msg) => msg.id === idNumber);
    socket.emit('new', newMessage[0]);
  } else {
    lastElement.classList.add('crossOut');
    socket.emit('del', lastElement.id);
  }
}
function newMsg(msg) {
  messages.push(msg);
  const articleElement = document.querySelector('article');
  const p = document.createElement('p');
  p.textContent = `[${msg.id}] ${msg.displayName}: ${msg.msg}`;
  p.style.transform = 'translateX(100vw)';
  p.id = msg.id;
  p.classList.add('fadeIn');
  if (msg.show === false) p.classList.add('crossOut');
  p.addEventListener('click', clickForRemove);
  articleElement.appendChild(p);
}

socket.on('connect', () => {
  socket.emit('allAdmin');
});

socket.on('allAdmin', (data) => {
  data.forEach((msg) => {
    newMsg(msg);
  });
});

socket.on('new', (data) => {
  newMsg(data);
});
