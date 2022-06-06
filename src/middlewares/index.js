const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/tokenManager');
const User = require('../models').user;
const Admin = require('../models').admin;

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
        const decoded = verifyToken(token);
        const user = await User.findOne({
            where: { id: decoded.id },
            attributes: ['id', 'fullname', 'email'],
        });

        if (!user) throw new AppError('Invalid token!');

        req.user = user;
        next();
    } else {
        throw new AppError('Invalid token', 403);
    }
};

exports.isAdmin = async (req, res) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
        const decoded = verifyToken(token);

        const admin = await Admin.findOne({
            where: { id: decoded.id },
            attributes: ['id', 'username'],
        });

        if (!admin) throw new AppError('Invalid token!');

        req.admin = admin;
        next();
    } else {
        throw new AppError('Invalid token', 403);
    }
};
