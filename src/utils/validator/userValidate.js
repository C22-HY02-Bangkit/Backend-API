const { check } = require('express-validator');
const User = require('../../models').user;

const registerValidate = [
    check('fullname').notEmpty().withMessage('fullname is required'),
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
    check('password').notEmpty().withMessage('password is required'),
];

const loginValidate = [
    check('email').notEmpty().withMessage('email is required').isEmail(),
    check('password').notEmpty().withMessage('password is required'),
];

const forgotPasswordValidate = [
    check('email').notEmpty().withMessage('email is required').isEmail(),
];

const resetPasswordValidate = [
    check('user_id')
        .notEmpty()
        .isUUID()
        .withMessage('user_id format must be UUID'),
    check('password').notEmpty(),
];

const verifyEmailValidate = [
    check('user_id')
        .notEmpty()
        .isUUID()
        .withMessage('user_id format must be UUID'),
];

const resendEmailValidate = [
    check('email').notEmpty().withMessage('email is required').isEmail(),
];

module.exports = {
    registerValidate,
    loginValidate,
    forgotPasswordValidate,
    resetPasswordValidate,
    verifyEmailValidate,
    resendEmailValidate,
};
