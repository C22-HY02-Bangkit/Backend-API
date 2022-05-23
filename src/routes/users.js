const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { login, register, me } = require('../controllers/usersController');
const User = require('../models').user;

const registerValidate = [
    check('fullname').notEmpty(),
    check('email')
        .notEmpty()
        .isEmail()
        .custom((value) => {
            return User.findOne({ where: { email: value } }).then((data) => {
                console.log('data', value, data);
                if (data) {
                    return Promise.reject('email already exists!');
                }
            });
        }),
    check('password').notEmpty(),
];

router.get('/me', me);
router.post('/login', login);
router.post('/register', registerValidate, register);

module.exports = router;
