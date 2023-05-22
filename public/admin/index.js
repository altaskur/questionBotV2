// eslint-disable-next-line no-undef
const socket = io('http://localhost:3020');

socket.on('connect', () => {});

const button = document.querySelector('button');

button.addEventListener('click', () => {
  socket.emit('ping', 'ping');
});

socket.on('ping', () => {
  console.log('Received pong');
});

socket.on('msg', (data) => {
  console.log(`Received msg ${data}`);
});
// socket.on('data', (data) => {
//   console.log('Received event', data);
//   textArea.value = `Evento: ${data.event} Datos: ${data.data}`;
// });
