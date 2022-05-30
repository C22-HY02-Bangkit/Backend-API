const { check } = require('express-validator');

const postDataValidate = [
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

module.exports = {
    postDataValidate,
};
