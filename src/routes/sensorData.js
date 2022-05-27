const express = require('express');
const { protect } = require('../middlewares');
const router = express.Router();
const { addSensorData } = require('../controllers/sensorDataController');
const { postDataValidate } = require('../utils/validator/sensorDataValidator');

router.post('/:device_id', protect, postDataValidate, addSensorData);

module.exports = router;
