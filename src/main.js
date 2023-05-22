require('dotenv').config();

const io = require('./io/settings');
const app = require('./express/settings');
const client = require('./tmi/settings');

io.listen(process.env.PORT_IO, () => {
  console.log('Socket-io server on port ', process.env.PORT_IO);
});

client.connect();

app.listen(process.env.PORT_EXPRESS, () => {
  console.log('Express server on port ', process.env.PORT_EXPRESS);
});
