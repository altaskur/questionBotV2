// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');
const messages = [];
function newMsg(msg) {
  const idNumber = parseInt(msg.id, 10);
  const index = messages.findIndex((message) => message.id === idNumber);
  if (index === -1) {
    messages.push(msg);
    const articleElement = document.querySelector('article');
    const p = document.createElement('p');
    p.textContent = `[${msg.id}] ${msg.displayName}: ${msg.msg}`;
    p.style.transform = 'translateX(100vw)';
    p.classList.add('fadeIn');
    p.id = msg.id;
    articleElement.appendChild(p);
  } else {
    console.log('ya tengo el mensaje');
  }
}

function delMsg(id) {
  const p = document.getElementById(id);
  if (p) {
    p.classList.remove('fadeIn');
    p.classList.add('fadeOut');

    setTimeout(() => {
      p.remove();
      const idNumber = parseInt(id, 10);
      const index = messages.findIndex((message) => message.id === idNumber);
      if (index !== -1) messages.splice(index, 1);
    }, 2200);
  }
}

socket.on('connect', () => {
  socket.emit('all');
});

socket.on('all', (data) => {
  data.forEach((msg) => {
    newMsg(msg);
  });
});

socket.on('new', (data) => {
  newMsg(data);
});

socket.on('del', (data) => {
  delMsg(data);
});
