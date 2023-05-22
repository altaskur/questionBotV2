const express = require('express');

const router = express.Router();

router.get('/', express.static('client'));

module.exports = router;
