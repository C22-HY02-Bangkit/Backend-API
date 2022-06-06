const express = require('express');
const { isAdmin } = require('../middlewares');
const router = express.Router();

// admin routes
router.use('/admin', isAdmin, require('./admin'));

// user routes
router.use('/users', require('./users'));
router.use('/sensor', require('./sensorData'));
router.use('/devices', require('./devices'));
router.use('/planted', require('./planted'));

module.exports = router;
