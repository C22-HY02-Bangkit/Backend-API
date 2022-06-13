const express = require('express');
const router = express.Router();
const Province = require('../models').province;

// public route
router.get('/province', async (req, res) => {
    const provinces = await Province.findAll({
        attributes: ['id', 'name'],
    });

    res.json({
        code: 200,
        status: 'success',
        data: provinces,
    });
});

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
