const { matchedData, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const { errorMsgTrans } = require('../utils/transform');
const { compareSync } = require('bcryptjs');
const { generateToken } = require('../utils/tokenManager');

const Admin = require('../models').admin;

exports.login = async (req, res) => {
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    // find admin by username
    const admin = await Admin.findOne({
        where: { username: bodyData.username },
    });

    // check if account is exists
    if (!admin) throw new AppError('Invalid credentials!', 400);

    // compare password
    const match = compareSync(bodyData.password, admin.password);
    if (!match) throw new AppError('Invalid credentials!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Login success!',
        data: {
            token: generateToken(admin.id),
            admin_id: admin.id,
            username: admin.username,
        },
    });
};
