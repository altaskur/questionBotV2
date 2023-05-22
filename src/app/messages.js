const messagesAdmin = [];
const messages = [];

function getMessagesAdmin() {
  return messagesAdmin;
}
function getMessages() {
  return messagesAdmin;
}

function setMessagesAdmin(message) {
  messagesAdmin.push(message);
  messages.push(message);
}
function getLastId() {
  const lastId = messagesAdmin.length;
  console.log(`last id ${lastId}`);
  return lastId;
}

module.exports = {
  getMessagesAdmin,
  setMessagesAdmin,
  getMessages,
  getLastId,
};
