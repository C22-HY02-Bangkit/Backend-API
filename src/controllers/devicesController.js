const AppError = require('../utils/AppError');

const Device = require('../models').device;

exports.getDevices = async (req, res) => {
    const { id: user_id } = req.user;

    // get device belong to user
    const device = await Device.findAll({ where: { user_id } });

    if (!device) throw new AppError('Device not found!', 404);

    res.json({ code: 200, status: 'success', data: device });
};

exports.getDevice = async (req, res) => {};

exports.addDevice = async (req, res) => {};

exports.editDevice = async (req, res) => {};

exports.deleteDevice = async (req, res) => {};
