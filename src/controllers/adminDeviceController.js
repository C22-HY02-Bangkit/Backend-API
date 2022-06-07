const { matchedData, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const User = require('../models').user;
const Admin = require('../models').admin;
const Device = require('../models').device;
const Plant = require('../models').plant;

exports.getDevices = async (req, res) => {
    // select all device with owner and plant
    const devices = await Device.findAll({
        include: ['planted', 'user'],
    });

    if (!devices) throw new AppError('Devices not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: devices,
    });
};

exports.getDevice = async (req, res) => {
    const { id } = req.params;

    const device = await Device.findOne({ where: { id } });

    if (!device) throw new AppError('Device not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: device,
    });
};

exports.addDevice = async (req, res) => {
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    // find user
    const user = await User.findOne({ where: { id: bodyData.user_id } });

    // check if user already registered
    if (!user) throw new AppError('User is not registered yet!', 404);

    // check if user is verified
    if (!user.verify_user) throw new AppError('User is not verified yet!', 400);

    //add new device
    const newDevice = await Device.create({
        id: uuidv4(),
        user_id: bodyData.user_id,
        name: bodyData.name,
        code: bodyData.code,
    });

    //check new device
    if (!newDevice) throw new AppError('Add device failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Device added!',
        data: {
            id: newDevice.id,
            name: newDevice.name,
            code: newDevice.code,
        },
    });
};

exports.editDevice = async (req, res) => {
    const { id } = req.params;

    // validate body
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

    //find device to update
    const device = await Device.findOne({ where: { id } });
    if (!device) throw new AppError('Device not found!', 404);

    //update device
    const updateDevice = await device.update({ ...bodyData });

    //check device update
    if (!updateDevice) throw new AppError('Update device failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update device success!',
        data: {
            id: device.id,
        },
    });
};

exports.removeDevice = async (req, res) => {
    const { id } = req.params;

    //find device
    const device = await Device.findOne({ where: { id } });
    if (!device) throw new AppError('Device not found!', 404);

    //delete device
    const deleteDevice = await device.destroy();
    if (!deleteDevice) throw new AppError('Delete device failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Delete device success!',
        data: {
            id: device.id,
        },
    });
};
