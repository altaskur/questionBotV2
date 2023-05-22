const tmi = require('tmi.js');
const io = require('../io/settings');
const { setMessagesAdmin, getMessagesAdmin, getLastId } = require('../app/messages');

const channelName = ['altaskur'];

const client = new tmi.Client({
  channels: channelName,
});
client.on('connected', () => {
  console.log(`Conectado a ${channelName[0]}`);
});

client.on('message', (channel, tags, message) => {
  const displayName = tags.username ?? '';
  let msg = message.toLocaleLowerCase();
  if (message.startsWith('!pregunta')) {
    msg = message.replace('!pregunta', '').trim();
    console.log(`mandando pregunta${msg}`);
    const ioMsg = {
      id: getLastId() + 1,
      msg,
      displayName,
      show: true,
    };
    console.log(ioMsg);
    setMessagesAdmin(ioMsg);
    io.emit('new', ioMsg);
  }
});
module.exports = {
  client,
  io,
};
