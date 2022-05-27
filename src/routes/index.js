const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/sensor', require('./sensorData'));

module.exports = router;
