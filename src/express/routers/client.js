const express = require('express');

const router = express.Router();

router.get('/', express.static('public/client'));
router.use('/assets/css', express.static('public/client/assets/css'));

module.exports = router;
