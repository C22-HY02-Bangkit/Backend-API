const AppError = require('../utils/AppError');
const { checkBodyPayload } = require('../utils/validator');
const { validationResult } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const Device = require('../models').device;
const { v4: uuidv4 } = require('uuid');
const { token } = require('morgan');

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

    const deviceDetail = await Device.findByPk(id);

    if (!deviceDetail)
        throw new AppError('The id is not related to any devices', 404);

    res.json({ code: 200, status: 'success', data: deviceDetail });
};

exports.addDevice = async (req, res) => {
    const { id: user_id } = req.user;

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
    const newDevice = await Device.create({
        id: uuidv4(),
        user_id: user_id,
        name: bodyData.name,
        code: bodyData.code,
    });

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

exports.editDevice = async (req, res) => {};

exports.deleteDevice = async (req, res) => {};
