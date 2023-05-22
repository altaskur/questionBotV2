const { getMessagesAdmin } = require('../app/messages');

const httpServer = require('http').createServer();
const io = require('socket.io')(
  (httpServer,
  {
    cors: {
      origin: 'http://localhost:3021',
    },
  }),
);

io.on('connection', (client) => {
  client.on('connect', () => {
    console.log('Sending all data');
    client.emit('all', getMessagesAdmin());
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('all', () => {
    console.log('[New client] Sending data');
    client.emit('all', getMessagesAdmin());
  });

  client.on('ping', () => {
    console.log('Received ping');
    client.emit('ping', 'pong');
  });
});
module.exports = io;
