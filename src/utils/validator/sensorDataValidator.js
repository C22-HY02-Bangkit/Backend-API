const { check } = require('express-validator');

const postDataValidate = [
    // making optinal for a while
    check('ph').optional().isFloat().withMessage('ph should be a float'),
    check('tds').optional().isFloat().withMessage('tds should be a float'),
    check('ec').optional().isFloat().withMessage('ec should be a float'),
];

module.exports = {
    postDataValidate,
};
