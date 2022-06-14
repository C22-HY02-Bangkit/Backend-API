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
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    removeProduct,
} = require('../controllers/adminProductController');
const {
    loginValidator,
    addDeviceValidator,
    editDeviceValidator,
    addPlantValidator,
    editPlantValidator,
    productValidator,
} = require('../utils/validator/adminValidator');
const {
    getPlants,
    getPlant,
    addPlant,
    editPlant,
    removePlant,
} = require('../controllers/adminPlantController');
const { getUsers, getUser } = require('../controllers/adminUserController');

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
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', productValidator, addProduct);
router.put('/products/:id', productValidator, editProduct);
router.delete('/products/:id', removeProduct);

// plant
router.get('/plants', getPlants);
router.get('/plants/:id', getPlant);
router.post('/plants', addPlantValidator, addPlant);
router.put('/plants/:id', editPlantValidator, editPlant);
router.delete('/plants/:id', removePlant);

// user
router.get('/users', getUsers);
router.get('/users/:id', getUser);

module.exports = router;
