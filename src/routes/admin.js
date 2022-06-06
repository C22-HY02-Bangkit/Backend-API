const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares');
const { login } = require('../controllers/adminController');
const { loginValidator } = require('../utils/validator/adminValidator');

router.get('/auth/login', loginValidator, login);

module.exports = router;


/**
 * crud device
 * crud product
 * 
 * 
 */
