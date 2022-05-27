const { check } = require('express-validator');
const Device = require('../../models').device;

const postDataValidate = [
    check('name')
        .notEmpty()
        .withMessage('ph is required')
        .isString()
        .withMessage('ph should be a string'),
    check('code')
        .notEmpty()
        .withMessage('ph is required')
        .isString()
        .withMessage('ph should be a string')
        .custom((value) => {
            return Device.findOne({ where: { code: value } }).then((data) => {
                if (data) {
                    return Promise.reject('Code name already exists!');
                }
            });
        }),
];

const updateDataValidate = [
    check('name')
        .notEmpty()
        .withMessage('ph is required')
        .isString()
        .withMessage('ph should be a string'),
];

module.exports = {
    postDataValidate,
    updateDataValidate,
};
