const express = require('express');

const router = express.Router();

router.get('/', express.static('public/admin'));
router.use('/assets/', express.static('public/admin/assets'));

module.exports = router;
