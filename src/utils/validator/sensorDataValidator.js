const { check } = require('express-validator');

const postDataValidate = [
    check('ph')
        .notEmpty()
        .withMessage('ph field is required')
        .isFloat()
        .withMessage('ph should be a float'),
    check('tds')
        .notEmpty()
        .withMessage('tds field is required')
        .isFloat()
        .withMessage('tds should be a float'),
    check('ec')
        .notEmpty()
        .withMessage('ec field is required')
        .isFloat()
        .withMessage('ec should be a float'),
];

module.exports = {
    postDataValidate,
};
