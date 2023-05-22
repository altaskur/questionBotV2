const express = require('express');

const router = express.Router();

router.get('/', express.static(`${__dirname}/admin`));

module.exports = router;
