const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/sensor', require('./sensorData'));
router.use('/device', require('./devices'));

module.exports = router;
