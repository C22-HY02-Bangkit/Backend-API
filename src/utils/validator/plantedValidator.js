const { check } = require('express-validator');

const postDataValidate = [
    check('device_id')
        .notEmpty()
        .withMessage('device_id field is required')
        .isUUID()
        .withMessage('device_id should be a valid UUID'),
    check('plant_id')
        .notEmpty()
        .withMessage('plant_id field is required')
        .isUUID()
        .withMessage('plant_id should be a valid UUID'),
    check('ph')
        .notEmpty()
        .withMessage('ph field is required')
        .isInt()
        .withMessage('ph should be a number'),
    check('tds')
        .notEmpty()
        .withMessage('tds field is required')
        .isInt()
        .withMessage('tds should be a number'),
    check('ec')
        .notEmpty()
        .withMessage('ec field is required')
        .isInt()
        .withMessage('ec should be a number'),
];
const updateDataValidate = [
    check('ph').optional().isInt().withMessage('ph should be a number'),
    check('tds').optional().isInt().withMessage('tds should be a number'),
    check('ec').optional().isInt().withMessage('ec should be a number'),
];

module.exports = {
    postDataValidate,
    updateDataValidate,
};
