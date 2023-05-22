const express = require('express');

const router = express.Router();

router.get('/', express.static(`${__dirname}/client`));

module.exports = router;
