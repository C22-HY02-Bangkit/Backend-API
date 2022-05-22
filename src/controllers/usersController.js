const user = require('../models').user;

// note: cuman untuk contoh - akan dihapus dikemudian hari
exports.me = async (req, res) => {
    const users = await user.findAll();

    if (!users) throw new Error('users not found!');

    res.json({
        code: 200,
        status: 'success',
        data: users,
    });
};

exports.register = async (req, res) => {
    const { fullname, email, password, password2 } = req.body;

    res.json({
        code: 200,
        status: 'success',
        message: 'User created',
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
