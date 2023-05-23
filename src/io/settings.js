const {
  removeClientList, messages, messagesAdmin, changeState,
// eslint-disable-next-line import/order
} = require('../app/messages');

const httpServer = require('http').createServer();
const io = require('socket.io')(
  (httpServer,
  {
    cors: {
      origin: '*',
    },
  }),
);

io.on('connection', (client) => {
  client.on('all', () => {
    client.emit('all', messages);
  });

  client.on('allAdmin', () => {
    client.emit('allAdmin', messagesAdmin);
  });

  client.on('AdminDel', (id) => {
    removeClientList(id);
    changeState(id);
    client.broadcast.emit('del', id);
  });

  client.on('new', (data) => {
    client.broadcast.emit('new', data);
  });
});
module.exports = io;
