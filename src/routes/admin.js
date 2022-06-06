const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares');
const { login } = require('../controllers/adminAuthController');
const {
    getDevices,
    getDevice,
    addDevice,
    editDevice,
    removeDevice,
} = require('../controllers/adminDeviceController');
const {
    loginValidator,
    addDeviceValidator,
    editDeviceValidator,
} = require('../utils/validator/adminValidator');

// auth
router.post('/auth/login', loginValidator, login);

// admin middleware
router.use(isAdmin);

// device
router.get('/devices', getDevices);
router.get('/devices/:id', getDevice);
router.post('/devices', addDeviceValidator, addDevice);
router.put('/devices/:id', editDeviceValidator, editDevice);
router.delete('/devices/:id', removeDevice);

// product
router.get('/products');

module.exports = router;
