const { check } = require('express-validator');
const User = require('../../models').user;

const registerValidate = [
    check('fullname').notEmpty().withMessage('fullname field is required'),
    check('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .custom((value) => {
            return User.findOne({ where: { email: value } }).then((data) => {
                if (data) {
                    return Promise.reject('email already exists!');
                }
            });
        }),
    check('password').notEmpty().withMessage('password field is required'),
];

const loginValidate = [
    check('email').notEmpty().withMessage('email field is required').isEmail(),
    check('password').notEmpty().withMessage('password field is required'),
];

const forgotPasswordValidate = [
    check('email').notEmpty().withMessage('email field is required').isEmail(),
];

const resetPasswordValidate = [
    check('user_id')
        .notEmpty()
        .isUUID()
        .withMessage('user_id format must be valid UUID'),
    check('password').notEmpty().withMessage('password field is required'),
];

const verifyEmailValidate = [
    check('user_id')
        .notEmpty()
        .isUUID()
        .withMessage('user_id format must be valid UUID'),
];

const resendEmailValidate = [
    check('email').notEmpty().withMessage('email field is required').isEmail(),
];

module.exports = {
    registerValidate,
    loginValidate,
    forgotPasswordValidate,
    resetPasswordValidate,
    verifyEmailValidate,
    resendEmailValidate,
};
