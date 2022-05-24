const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { login, register, me } = require('../controllers/usersController');
const User = require('../models').user;

const registerValidate = [
    check('fullname').notEmpty().withMessage('fullname is required'),
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .custom((value) => {
            return User.findOne({ where: { email: value } }).then((data) => {
                console.log('data', value, data);
                if (data) {
                    return Promise.reject('email already exists!');
                }
            });
        }),
    check('password').notEmpty().withMessage('password is required'),
];

const loginValidate = [
    check('email').notEmpty().withMessage('email is required').isEmail(),
    check('password').notEmpty().withMessage('password is required'),
];

router.get('/me', me);
router.post('/login', loginValidate, login);
router.post('/register', registerValidate, register);

module.exports = router;
