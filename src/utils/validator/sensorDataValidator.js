const { check } = require('express-validator');

const postDataValidate = [
    check('ph')
        .notEmpty()
        .withMessage('ph is required')
        .isInt()
        .withMessage('ph should be a number'),
    check('tds')
        .notEmpty()
        .withMessage('tds is required')
        .isInt()
        .withMessage('tds should be a number'),
    check('ec')
        .notEmpty()
        .withMessage('ec is required')
        .isInt()
        .withMessage('ec should be a number'),
];

module.exports = {
    postDataValidate,
};
