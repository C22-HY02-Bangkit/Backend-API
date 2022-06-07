const { check } = require('express-validator');

const PostValidator = [
    check('text').notEmpty().withMessage('text field is required'),
];

module.exports = { PostValidator };
