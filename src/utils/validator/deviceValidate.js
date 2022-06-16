const { check } = require('express-validator');
const Device = require('../../models').device;

const updateDataValidate = [
    check('plant_id')
        .optional()
        .isUUID()
        .withMessage('plant_id id  should be a valid UUID'),
    check('description')
        .optional()
        .isString()
        .withMessage('description should be a string'),
    check('status')
        .optional()
        .isInt()
        .withMessage('integer should be a integer'),
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
    updateDataValidate,
};
