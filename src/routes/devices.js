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

router.get('/', protect, getDevices);
router.get('/:id', protect, getDevice);
router.post('/', protect, addDevice);
router.put('/:id', protect, editDevice);
router.delete('/:id', protect, deleteDevice);

module.exports = router;
