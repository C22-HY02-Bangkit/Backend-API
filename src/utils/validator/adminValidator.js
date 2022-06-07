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

const addProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('title field is required')
        .isString()
        .withMessage('title field must be string'),
    check('description')
        .notEmpty()
        .withMessage('description field is required')
        .isString()
        .withMessage('description field must be string'),
    check('price')
        .notEmpty()
        .withMessage('price field is required')
        .isInt()
        .withMessage('price must be a number'),
];

const editProductValidator = [
    check('title')
        .optional()
        .isString()
        .withMessage('title field must be string'),
    check('description')
        .optional()
        .isString()
        .withMessage('description field must be string'),
    check('price').optional().isInt().withMessage('price must be a number'),
];

module.exports = {
    loginValidator,
    addDeviceValidator,
    editDeviceValidator,
    addProductValidator,
    editProductValidator,
};
