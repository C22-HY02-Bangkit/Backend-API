const express = require('express');
const router = express.Router();

// admin routes
router.use('/admin', require('./admin'));

// user routes
router.use('/users', require('./users'));
router.use('/sensor', require('./sensorData'));
router.use('/devices', require('./devices'));

// in active route for a while
// router.use('/products', require('./products'));
// router.use('/posts', require('./posts'));

module.exports = router;
