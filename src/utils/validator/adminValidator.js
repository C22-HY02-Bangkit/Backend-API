const { check } = require('express-validator');

const loginValidator = [
    check('username').notEmpty().withMessage('username field is required'),
    check('password').notEmpty().withMessage('password field is required'),
];

const addDeviceValidator = [
    check('user_id')
        .notEmpty()
        .withMessage('user_id field is required')
        .isUUID()
        .withMessage('user_id should be a valid UUID'),
    check('product_id')
        .notEmpty()
        .withMessage('product_id field is required')
        .isUUID()
        .withMessage('product_id should be a valid UUID'),
];

const editDeviceValidator = [
    check('user_id')
        .optional()
        .isUUID()
        .withMessage('user_id should be a valid UUID'),
    check('product_id')
        .notEmpty()
        .withMessage('product_id field is required')
        .isUUID()
        .withMessage('product_id should be a valid UUID'),
];

const productValidator = [
    check('title')
        .notEmpty()
        .withMessage('title field is required')
        .isString()
        .withMessage('title field must be string'),
];


const addPlantValidator = [
    check('name')
        .notEmpty()
        .withMessage('name field is required')
        .isString()
        .withMessage('name should be a string'),
    check('min_ph')
        .notEmpty()
        .withMessage('min_ph field is required')
        .isFloat()
        .withMessage('min_ph should be a float'),
    check('max_ph')
        .notEmpty()
        .withMessage('max_ph field is required')
        .isFloat()
        .withMessage('max_ph should be a float'),
    check('min_tds')
        .notEmpty()
        .withMessage('min_tds field is required')
        .isFloat()
        .withMessage('min_tds should be a float'),
    check('max_tds')
        .notEmpty()
        .withMessage('max_tds field is required')
        .isFloat()
        .withMessage('max_tds should be a float'),
    check('min_ec')
        .notEmpty()
        .withMessage('min_ec field is required')
        .isFloat()
        .withMessage('min_ec should be a float'),
    check('max_ec')
        .notEmpty()
        .withMessage('max_ec field is required')
        .isFloat()
        .withMessage('max_ec should be a float'),
];
const editPlantValidator = [
    check('name').optional().isString().withMessage('name should be a string'),
    check('min_ph')
        .optional()
        .isFloat()
        .withMessage('min_ph should be a float'),
    check('max_ph')
        .optional()
        .isFloat()
        .withMessage('max_ph should be a float'),
    check('min_tds')
        .optional()
        .isFloat()
        .withMessage('min_tds should be a float'),
    check('max_tds')
        .optional()
        .isFloat()
        .withMessage('max_tds should be a float'),
    check('min_ec')
        .optional()
        .isFloat()
        .withMessage('min_ec should be a float'),
    check('max_ec')
        .optional()
        .isFloat()
        .withMessage('max_ec should be a float'),
];

module.exports = {
    loginValidator,
    addDeviceValidator,
    editDeviceValidator,
    productValidator,
    addPlantValidator,
    editPlantValidator,
};
