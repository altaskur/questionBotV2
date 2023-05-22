const express = require('express');
const cors = require('cors');

const app = express();
const clientRouter = require('./routers/client');
const adminRouter = require('./routers/admin');

app.use(cors());
app.use('/client/', clientRouter);
app.use('/admin/', adminRouter);

module.exports = app;
