const express = require('express');

const router = express.Router();

router.get('/fonts', express.static('assets/fonts'));
router.use('/js', express.static('assets/js'));

module.exports = router;
