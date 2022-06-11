const AppError = require('../utils/AppError');
const User = require('../models').user;
const Device = require('../models').device;
const UserProfile = require('../models').user_profile;
const Plant = require('../models').plant;

exports.getUsers = async (req, res) => {
    // get all users
    const users = await User.findAll({
        include: ['detail', 'devices'],
    });

    // transform response data
    const data = users.map((user) => ({
        id: user.id,
        fullname: user.fullname,
        email: user.fullname,
        total_device: user.devices.length,
        phone_number: user.detail.phone_number,
        province: user.detail.province,
        address: user.detail.address,
    }));

    if (!users.length) throw new AppError('Users not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: data,
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
                attributes: ['phone_number', 'province', 'address'],
            },
            {
                model: Device,
                as: 'devices',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Plant,
                        as: 'planted',
                        attributes: ['id', 'name'],
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
