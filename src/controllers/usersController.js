const { genSaltSync, hashSync } = require('bcryptjs');
const User = require('../models').user;
const { validationResult } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/tokenManager');

// note: cuman untuk contoh - akan dihapus dikemudian hari
exports.me = async (req, res) => {
    const users = await User.findAll();

    res.json({
        code: 200,
        status: 'success',
    });
};

exports.register = async (req, res) => {
    const bodyData = req.body;

    // check body
    for (const key in bodyData) {
        const payload = ['fullname', 'email', 'password'];

        // check updateable data
        if (!payload.includes(key)) {
            res.status(400).json({
                code: 400,
                message: 'Please check your input!',
                error: `${key} is not valid!`,
            });
        }
    }

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            code: 403,
            message: 'Invalid input!',
            errors: errorMsgTrans(errors.array()),
        });
    }

    // hash password
    const password = hashSync(bodyData.password, genSaltSync(10));

    const newUser = await User.create({
        id: uuidv4(),
        fullname: bodyData.fullname,
        email: bodyData.email,
        password: password,
    });

    res.json({
        code: 200,
        status: 'success',
        message: 'User created',
        data: {
            email: newUser.email,
            token: generateToken(newUser.id),
        },
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    res.json({
        code: 200,
        status: 'success',
        message: 'Login success',
    });
};
