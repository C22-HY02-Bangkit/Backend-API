const { check } = require('express-validator');
const Device = require('../../models').device;

const postDataValidate = [
    check('name')
        .notEmpty()
        .withMessage('name field is required')
        .isString()
        .withMessage('name should be a string'),
    check('code')
        .notEmpty()
        .withMessage('code field is required')
        .isString()
        .withMessage('code should be a string')
        .custom((value) => {
            return Device.findOne({ where: { code: value } }).then((data) => {
                if (data) {
                    return Promise.reject('Code name already exists!');
                }
            });
        }),
];

const updateDataValidate = [
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
    postDataValidate,
    updateDataValidate,
};
