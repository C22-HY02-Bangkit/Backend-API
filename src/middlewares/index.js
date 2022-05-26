const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/tokenManager');
const User = require('../models').user;

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
