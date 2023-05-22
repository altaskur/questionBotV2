const express = require('express');
const cors = require('cors');

const app = express();
const assetsRouter = require('./routers/assets');
const clientRouter = require('./routers/client');
const adminRouter = require('./routers/admin');

app.use(express.static('public'));
app.use(cors());
app.use('/assets/', assetsRouter);
app.use('/client/', clientRouter);
app.use('/admin/', adminRouter);

module.exports = app;
