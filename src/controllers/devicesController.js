const AppError = require('../utils/AppError');
const { validationResult, matchedData } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const Device = require('../models').device;
const Plant = require('../models').plant;
const { v4: uuidv4 } = require('uuid');

exports.getDevices = async (req, res) => {
    const { id: user_id } = req.user;

    // get all device belong to user
    const devices = await Device.findAll({
        where: { user_id },
        attributes: ['id', 'code', 'name'],
        include: [{ model: Plant, as: 'planted', attributes: ['id', 'name'] }],
    });

    // check if exists
    if (!devices) throw new AppError('Devices not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: devices,
    });
};

exports.getDevice = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

    //get device detail by id
    const deviceDetail = await Device.findOne({
        where: { id },
        attributes: ['id', 'code', 'name', 'user_id'],
        include: [{ model: Plant, as: 'planted', attributes: ['id', 'name'] }],
    });

    if (!deviceDetail)
        throw new AppError('The id is not related to any devices', 404);

    // check if user has access
    if (deviceDetail.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    res.json({
        code: 200,
        status: 'success',
        data: deviceDetail,
    });
};

exports.editDevice = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

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

    // check if user has access
    if (device.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    //update device
    const updateDevice = await device.update({ ...bodyData });

    //check device update
    if (!updateDevice) throw new AppError('Update device failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update device success!',
        device_id: device.id,
    });
};
