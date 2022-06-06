const { check } = require('express-validator');

const loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('email not valid'),
    check('password').notEmpty().withMessage('password field is required'),
];
s;

module.exports = {};
