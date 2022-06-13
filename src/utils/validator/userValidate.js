const { check } = require('express-validator');
const User = require('../../models').user;

const EditProfileValidate = [
    check('location')
        .optional()
        .isJSON()
        .withMessage('location must be a json format'),
    check('phone_number')
        .optional()
        .isString()
        .withMessage('phone_number must be a string'),
    check('province_id')
        .optional()
        .isInt()
        .withMessage('province_id format must be valid integer'),
    check('address')
        .optional()
        .isString()
        .withMessage('address must be a string'),
    check('instagram_url')
        .optional()
        .isString()
        .withMessage('instagram_url must be a string'),
    check('twitter_url')
        .optional()
        .isString()
        .withMessage('twitter_url must be a string'),
    check('facebook_url')
        .optional()
        .isString()
        .withMessage('facebook_url must be a string'),
    check('location_privacy')
        .optional()
        .isBoolean()
        .withMessage('location_privacy must be a boolean'),
    check('planted_privacy')
        .optional()
        .isBoolean()
        .withMessage('planted_privacy must be a boolean'),
];

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
    EditProfileValidate,
};
