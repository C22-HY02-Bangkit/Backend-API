const express = require('express');
const { protect } = require('../middlewares');
const router = express.Router();

const {
    getDevices,
    getDevice,
    addDevice,
    editDevice,
    deleteDevice,
} = require('../controllers/devicesController');
const {
    postDataValidate,
    updateDataValidate,
} = require('../utils/validator/deviceValidate');

router.get('/', protect, getDevices);
router.get('/:id', protect, getDevice);
router.post('/', protect, postDataValidate, addDevice);
router.put('/:id', protect, updateDataValidate, editDevice);
router.delete('/:id', protect, deleteDevice);

module.exports = router;
