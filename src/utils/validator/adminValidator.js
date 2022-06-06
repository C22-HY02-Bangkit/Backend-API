const { check } = require('express-validator');

const loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('email field is required')
        .isEmail()
        .withMessage('email not valid'),
    check('password').notEmpty().withMessage('password field is required'),
];

const addDeviceValidator = [
    check('user_id')
        .notEmpty()
        .withMessage('user_id field is required')
        .isUUID()
        .withMessage('user_id should be a valid UUID'),
    check('name')
        .notEmpty()
        .withMessage('name field is required')
        .isString()
        .withMessage('name field must be string'),
    check('code')
        .notEmpty()
        .withMessage('code field is required')
        .isString()
        .withMessage('code field must be string'),
];

const editDeviceValidator = [
    check('user_id')
        .notEmpty()
        .withMessage('user_id field is required')
        .isUUID()
        .withMessage('user_id should be a valid UUID'),
    check('name')
        .notEmpty()
        .withMessage('name field is required')
        .isString()
        .withMessage('name field must be string'),
    check('code')
        .notEmpty()
        .withMessage('code field is required')
        .isString()
        .withMessage('code field must be string'),
];

module.exports = {
    loginValidator,
    addDeviceValidator,
    editDeviceValidator,
};
