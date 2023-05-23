const tmi = require('tmi.js');
const io = require('../io/settings');
const { setMessagesAdmin, getLastId } = require('../app/messages');

const channelName = ['altaskur'];

const client = new tmi.Client({
  channels: channelName,
});

client.on('message', (channel, tags, message) => {
  const displayName = tags.username ?? '';
  let msg = message.toLocaleLowerCase();
  if (message.startsWith('!q')) {
    msg = message.replace('!q', '').trim();

    const ioMsg = {
      id: getLastId() + 1,
      msg,
      displayName,
      show: true,
    };
    setMessagesAdmin(ioMsg);
    io.emit('new', ioMsg);
  }
});
module.exports = {
  client,
  io,
};
