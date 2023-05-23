// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');
const messages = [];
const articleElement = document.querySelector('article');

function clickForRemove(event) {
  const lastElement = event.target;
  if (lastElement.classList.contains('crossOut')) {
    lastElement.classList.remove('crossOut');
    const idNumber = parseInt(lastElement.id, 10);
    console.log(lastElement.id);
    console.log('tengo estos mensajes', messages);
    const newMessage = messages.filter((msg) => parseInt(msg.id, 10) === idNumber);
    console.log('he encontrado este mensaje', newMessage);
    socket.emit('new', newMessage[0]);
  } else {
    lastElement.classList.add('crossOut');
    socket.emit('AdminDel', lastElement.id);
  }
}
function newMsg(msg) {
  const index = messages.findIndex((message) => message.id === msg.id);
  if (index === -1) {
    messages.push(msg);
    const p = document.createElement('p');
    p.textContent = `[${msg.id}] ${msg.displayName}: ${msg.msg}`;
    p.style.transform = 'translateX(100vw)';
    p.id = msg.id;
    p.classList.add('fadeIn');
    if (msg.show === false) p.classList.add('crossOut');
    p.addEventListener('click', clickForRemove);
    articleElement.appendChild(p);
  } else {
    console.log(index + 1);
    const lastElement = document.getElementById(index + 1);
    lastElement.classList.remove('crossOut');
  }
}

socket.on('connect', () => {
  socket.emit('allAdmin');
});
socket.on('del', (id) => {
  console.log('tengo que eliminar el mensaje', id);
  const idNumber = parseInt(id, 10);
  const index = messages.findIndex((message) => message.id === idNumber);
  if (index !== -1) {
    messages[index].show = false;
  }
  console.log(messages);
  const lastElement = document.getElementById(id);
  lastElement.classList.add('crossOut');
});

socket.on('allAdmin', (data) => {
  console.log('he recibido: ', data);
  data.forEach((msg) => {
    newMsg(msg);
    console.log('añadiendo ', msg);
  });
});

socket.on('new', (data) => {
  console.log('he recibido', data);
  newMsg(data);
});
