const express = require('express');
const { protect } = require('../middlewares');
const router = express.Router();
const {
    addSensorData,
    getSensorData,
} = require('../controllers/sensorDataController');
const { postDataValidate } = require('../utils/validator/sensorDataValidator');

router.get('/', protect, getSensorData);
router.post('/:device_id', protect, postDataValidate, addSensorData);

module.exports = router;
