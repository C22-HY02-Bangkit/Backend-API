const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { validationResult, matchedData } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/tokenManager');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const Email = require('../utils/email/Email');
const { Op } = require('sequelize');
const User = require('../models').user;
const UserProfile = require('../models').user_profile;
const Province = require('../models').province;

exports.getUsers = async (req, res) => {
    const { id } = req.user;

    // get user data
    const user = await User.findOne({
        where: { id },
        attributes: ['id', 'fullname', 'email'],
        include: [
            {
                model: UserProfile,
                as: 'detail',
                attributes: ['province_id'],
            },
        ],
    });

    // check if user is exist
    if (!user) throw new AppError('User not found!', 404);

    // check if user already set a province
    if (!user.detail.province_id) {
        throw new AppError('The User has not set a province yet!');
    }

    // get all users with same province
    const users = await User.findAll({
        where: { id: { [Op.not]: id } },
        attributes: ['id', 'fullname', 'email'],
        include: {
            model: UserProfile,
            as: 'detail',
            where: {
                province_id: user.detail.province_id,
            },
            include: [
                {
                    model: Province,
                    as: 'province',
                    attributes: ['name'],
                },
            ],
        },
    });

    if (!users.length) {
        throw new AppError('No users with the same province!', 404);
    }

    res.json({
        code: 200,
        status: 'success',
        data: users,
    });
};

exports.getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: { id },
        attributes: ['id', 'fullname', 'email'],
        include: [
            {
                model: UserProfile,
                as: 'detail',
                include: [
                    {
                        model: Province,
                        as: 'province',
                        attributes: ['name'],
                    },
                ],
            },
        ],
    });

    if (!user) throw new AppError('User not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: user,
    });
};

exports.me = async (req, res) => {
    const { id } = req.user;

    const user = await User.findOne({
        where: { id },
        attributes: ['id', 'fullname', 'email', 'verify_user', 'createdAt'],
        include: [
            {
                model: UserProfile,
                as: 'detail',
                include: [
                    {
                        model: Province,
                        as: 'province',
                        attributes: ['name'],
                    },
                ],
            },
        ],
    });

    res.json({
        code: 200,
        status: 'success',
        data: user,
    });
};

exports.editProfile = async (req, res) => {
    const { id: user_id } = req.user;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, {
        locations: ['body'],
        includeOptionals: false,
    });

    const user_profile = await UserProfile.findOne({ where: { user_id } });

    if (!user_profile) throw new AppError('User not found!', 404);
    await user_profile.update({ ...bodyData });

    res.json({
        code: 200,
        status: 'success',
        message: 'User profile updated!',
    });
};

exports.register = async (req, res) => {
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, {
        locations: ['body'],
    });

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

    // auto insert user profile
    await UserProfile.create({
        id: uuidv4(),
        user_id: newUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

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
        data: {
            token: generateToken(user.id),
            verify_user: user.verify_user,
            userid: user.id,
            fullname: user.fullname,
            email: user.email,
        },
    });
};

exports.resendEmail = async (req, res) => {
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    // check if user exists
    const user = await User.findOne({ where: { email: bodyData.email } });
    if (!user) throw new AppError('Email not found!', 404);

    // check if user account already verified
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
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

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
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    //check if the email is already in the database
    const user = await User.findOne({ where: { email: bodyData.email } });

    //if the user email does not exist
    if (!user) throw new AppError('Email not found!', 404);

    //generate random string
    const convertToken = crypto.randomBytes(32).toString('hex');

    // save generated token
    const save_token = await user.update({
        password_reset_token: hashSync(convertToken, genSaltSync(10)),
        password_reset_expires: Date.now() + 60 * 60 * 24 * 1000,
    });

    if (!save_token) {
        res.status(500).json({
            code: 500,
            message: 'An error occured while try to save token',
        });
    }

    const link = `http://localhost:3000/resetpassword?token=${convertToken}&id=${user.id}`;

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
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

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
