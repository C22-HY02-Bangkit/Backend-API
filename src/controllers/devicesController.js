const AppError = require('../utils/AppError');
const { checkBodyPayload } = require('../utils/validator');
const { validationResult } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const Device = require('../models').device;
const { v4: uuidv4 } = require('uuid');

exports.getDevices = async (req, res) => {
    const { id: user_id } = req.user;

    // get device belong to user
    const device = await Device.findAll({ where: { user_id } });

    if (!device) throw new AppError('Device not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        message: 'Success!',
        data: device,
    });
};

exports.getDevice = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

    //get device detail by id
    const deviceDetail = await Device.findAll({ where: { id } });
    if (!deviceDetail)
        throw new AppError('The id is not related to any devices', 404);

    // check if user has access
    if (!deviceDetail.user_id === user_id)
        throw new AppError('Access forbidden!', 403);

    res.json({
        code: 200,
        status: 'success',
        data: deviceDetail,
    });
};

exports.addDevice = async (req, res) => {
    const { id: user_id } = req.user;
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['name', 'code']);

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            code: 403,
            message: 'Content can not be empty!',
            errors: errorMsgTrans(errors.array({ onlyFirstError: true })),
        });
        return;
    }

    //add new device
    const newDevice = await Device.create({
        id: uuidv4(),
        user_id: user_id,
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
            name: newDevice.name,
            code: newDevice.code,
        },
    });
};

exports.editDevice = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['name']);

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            code: 403,
            message: 'Invalid input!',
            errors: errorMsgTrans(errors.array({ onlyFirstError: true })),
        });
        return;
    }

    //find device to update
    const device = await Device.findAll({ where: { id } });

    if (!device) throw new AppError('Device not found!', 401);

    // check if user has access
    if (!device.user_id === user_id)
        throw new AppError('Access forbidden!', 403);

    //update device
    const updateDevice = await device.update({
        name: bodyData.name,
    });

    //check device update
    if (!updateDevice) throw new AppError('Update device failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update device success!',
    });
};

exports.deleteDevice = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

    //find device
    const device = await Device.findAll({ where: { id } });
    if (!device) throw new AppError('Device not found!', 404);

    // check if user has access
    if (!deviceDetail.user_id === user_id)
        throw new AppError('Access forbidden!', 403);

    //delete device
    const deleteDevice = await device.destroy({
        where: { id: req.params.id },
    });

    //check delete process
    if (!deleteDevice) throw new AppError('Delete device failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Delete device success!',
    });
};
