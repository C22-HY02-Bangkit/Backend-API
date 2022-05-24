const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const User = require('../models').user;
const { validationResult } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/tokenManager');
const { checkBodyPayload } = require('../utils/validator');
const AppError = require('../utils/AppError');

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

    // check body payload
    checkBodyPayload(bodyData, ['fullname', 'email', 'password']);

    console.log('after5!@');

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            code: 403,
            message: 'Invalid input!',
            errors: errorMsgTrans(errors.array({ onlyFirstError: true })),
        });
        return;
    }

    // hash password
    const password = hashSync(bodyData.password, genSaltSync(10));

    // create new user
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
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['email', 'password']);

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            code: 403,
            message: 'Invalid input!',
            errors: errorMsgTrans(errors.array({ onlyFirstError: true })),
        });
        return;
    }

    // find user by email
    const user = await User.findOne({ where: { email: bodyData.email } });

    // if user not exists
    if (!user) throw new AppError('Email not found!', 404);

    // compare password
    const passwordMatch = compareSync(bodyData.password, user.password);
    if (!passwordMatch) {
        res.status(401).json({
            code: 401,
            message: 'Invalid Password!',
        });
    }

    res.json({
        code: 200,
        status: 'success',
        message: 'Login success!',
        token: generateToken(user.id),
    });
};
