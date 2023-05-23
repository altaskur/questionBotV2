// eslint-disable-next-line prefer-const
let messagesAdmin = [];
// eslint-disable-next-line prefer-const
let messages = [];

function changeState(id) {
  const idNumber = parseInt(id, 2);
  messagesAdmin = messagesAdmin.map((msgAdmin) => {
    if (msgAdmin.id === idNumber) {
      // eslint-disable-next-line no-param-reassign
      msgAdmin.show = false;
    }
    return msgAdmin;
  });
  return messagesAdmin;
}
function setMessagesAdmin(message) {
  messagesAdmin.push(message);
  messages.push(message);
}

function getLastId() {
  const lastId = messagesAdmin.length;
  return lastId;
}

function removeClientList(id) {
  const idNumber = parseInt(id, 2);
  const index = messages.findIndex((message) => message.id === idNumber);
  if (index !== -1) {
    messages.splice(index, 1);
  }
  return messages;
}
module.exports = {
  changeState,
  getLastId,
  removeClientList,
  setMessagesAdmin,
  messages,
  messagesAdmin,
};
