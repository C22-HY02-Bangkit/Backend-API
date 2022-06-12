const express = require('express');
const { protect } = require('../middlewares');
const router = express.Router();

const {
    getDevices,
    getDevice,
    editDevice,
} = require('../controllers/devicesController');
const { updateDataValidate } = require('../utils/validator/deviceValidate');

router.get('/', protect, getDevices);
router.get('/:id', protect, getDevice);
router.put('/:id', protect, updateDataValidate, editDevice);

module.exports = router;
