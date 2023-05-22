const tmi = require('tmi.js');
const io = require('../io/settings');

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

    io.on('connection', (ioClient) => {
      ioClient.emit('msg', msg);
    });
  }
});
module.exports = {
  client,
  io,
};
