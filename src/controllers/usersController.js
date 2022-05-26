const User = require('../models').user;
const Device = require('../models').device;
const SensorData = require('../models').sensor_data;
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { validationResult } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/tokenManager');
const { checkBodyPayload } = require('../utils/validator');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const Email = require('../utils/email/Email');
const { Op } = require('sequelize');

// note: cuman untuk contoh - akan dihapus dikemudian hari
exports.me = async (req, res) => {
    /**
     * contoh untuk ambil data dengan relasinya
     */
    const users = await User.findAll({
        where: { email: 'alfi@mail.com' },
    });
    const devices = await Device.findAll({
        include: ['user', 'sensor_datas'],
    });
    const sensor_data = await SensorData.findAll({
        include: ['device'],
    });

    res.json({
        code: 200,
        status: 'success',
        data: users,
    });
};

exports.register = async (req, res) => {
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['fullname', 'email', 'password']);

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

    // generate random string
    const token = crypto.randomBytes(32).toString('hex');

    // create new user
    const newUser = await User.create({
        id: uuidv4(),
        fullname: bodyData.fullname,
        email: bodyData.email,
        password: password,
        verify_user: false,
        email_verify_token: hashSync(token, genSaltSync(10)),
        email_verify_expires: Date.now() + 60 * 60 * 24 * 1000,
    });

    if (!newUser) throw new AppError('Register failed!', 400);

    const link = `http://localhost:3000/verify-email?token=${token}&userid=${newUser.id}`;

    // send email for verify user
    await new Email(
        newUser.email,
        'Greenponic - Verify your account now!',
        { name: newUser.fullname, link },
        'verifyemail'
    ).sendEmail();

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
    if (!user) throw new AppError('Invalid credentials!', 400);

    // compare password
    const passwordMatch = compareSync(bodyData.password, user.password);
    if (!passwordMatch) throw new AppError('Invalid credentials!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Login success!',
        token: generateToken(user.id),
    });
};

exports.resendEmail = async (req, res) => {
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['email']);

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

    const user = await User.findOne({ where: { email: bodyData.email } });

    if (!user) throw new AppError('Email not found!', 404);

    if (user.verify_user) throw new AppError('Email is already verified!', 400);

    // generate random string
    const token = crypto.randomBytes(32).toString('hex');

    // update user data
    user.email_verify_token = hashSync(token, genSaltSync(10));
    user.email_verify_expires = Date.now() + 60 * 60 * 24 * 1000;
    // save user
    await user.save();

    const link = `http://localhost:3000/verify-email?token=${token}&userid=${user.id}`;

    // send email for verify user
    await new Email(
        user.email,
        'Greenponic - Verify your account now!',
        { name: user.fullname, link },
        'verifyemail'
    ).sendEmail();

    res.json({
        code: 200,
        status: 'success',
        message: 'Email sent',
    });
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.params;
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['user_id']);

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

    // find user and check if verifyToken has not expires
    const user = await User.findOne({
        where: {
            id: bodyData.user_id,
            email_verify_expires: { [Op.gt]: Date.now() },
        },
    });

    if (!user) throw new AppError('Invalid credentials!', 401);

    // validate token
    const validateToken = compareSync(token, user.email_verify_token);
    if (!validateToken) throw new AppError('Invalid credentials!', 401);

    // update user
    await user.update({
        verify_user: true,
        email_verify_token: null,
        email_verify_expires: null,
    });

    res.json({
        code: 200,
        status: 'success',
        message: 'Verification email successfully!',
    });
};

exports.forgotPassword = async (req, res) => {
    const bodyData = req.body;

    checkBodyPayload(bodyData, ['email']);

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

    //check if the email is already in the database
    const user = await User.findOne({ where: { email: bodyData.email } });

    //if the user email does not exist
    if (!user) throw new AppError('Email not found!', 404);

    //convert token to hexastring
    const convertToken = crypto.randomBytes(32).toString('hex');

    // save generated token
    const save_token = await user.update({
        password_reset_token: hashSync(convertToken, genSaltSync(10)),
        password_reset_expires: Date.now() + 60 * 60 * 24 * 1000,
    });

    const link = `http://localhost:3000/resetpassword?token=${convertToken}&id=${user.id}`;

    if (!save_token) {
        res.status(500).json({
            code: 500,
            message: 'An error occured while try to save token',
        });
    }

    // send email for reset password
    await new Email(
        user.email,
        'Reset your Greenponic password',
        { name: user.name, link },
        'forgotpassword'
    ).sendEmail();

    res.json({
        code: 200,
        status: 'success',
        message: 'Email sent successfully!',
    });
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['user_id', 'password']);

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

    // find user and check if verifyToken has not expires
    const user = await User.findOne({
        where: {
            id: bodyData.user_id,
            password_reset_expires: { [Op.gt]: Date.now() },
        },
    });

    if (!user) throw new AppError('Invalid credentials!', 401);

    // validate token
    const validateToken = compareSync(token, user.password_reset_token);
    if (!validateToken) throw new AppError('Invalid credentials!', 401);

    // update user
    await user.update({
        password_change_at: Date.now(),
        password_reset_token: null,
        password_reset_expires: null,
    });

    res.json({
        code: 200,
        status: 'success',
        message: 'Reset password successfully!',
    });
};
