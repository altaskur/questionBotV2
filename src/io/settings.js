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
    console.log('Client connected');
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('event', (data) => {
    console.log('[New event] Received event', data);
  });

  client.on('ping', () => {
    console.log('Received ping');
    client.emit('ping', 'pong');
  });
});
module.exports = io;
