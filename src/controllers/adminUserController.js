const AppError = require('../utils/AppError');
const User = require('../models').user;
const Device = require('../models').device;
const UserProfile = require('../models').user_profile;
const Plant = require('../models').plant;
const Province = require('../models').province;
const Product = require('../models').product;

exports.getUsers = async (req, res) => {
    // get all users
    const users = await User.findAll({
        attributes: ['id', 'fullname', 'email'],
        include: [
            'devices',
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

    // transform response data
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
            {
                model: Device,
                as: 'devices',
                attributes: ['id'],
                include: [
                    {
                        model: Plant,
                        as: 'planted',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'title'],
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
