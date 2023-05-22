const { getMessagesAdmin, getMessages } = require('../app/messages');

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
  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('all', () => {
    console.log('[New client] Sending data');
    client.emit('all', getMessages());
  });

  client.on('allAdmin', () => {
    console.log('[New client] Sending data');
    client.emit('all', getMessagesAdmin());
  });

  client.on('ping', () => {
    console.log('Received ping');
    client.emit('ping', 'pong');
  });

  client.on('del', (data) => {
    console.log(`Received del ${data}`);
    client.emit('del', data);
  });
});
module.exports = io;
