const AppError = require('../utils/AppError');
const User = require('../models').user;

exports.getUsers = async (req, res) => {
    // get all users
    const users = await User.findAll();

    if (!users.length) throw new AppError('Users not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: users,
    });
};

exports.getUser = async (req, res) => {
    const { id } = req.params;

    // get user by id
    const user = await User.findOne({
        where: { id },
        include: ['devices', 'detail'],
    });

    if (!user) throw new AppError('User not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: user,
    });
};
