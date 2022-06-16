const { v4: uuidv4 } = require('uuid');
const { validationResult, matchedData } = require('express-validator');
const AppError = require('../utils/AppError');
const { errorMsgTrans } = require('../utils/transform');
const { Op } = require('sequelize');

const SensorData = require('../models').sensor_data;
const Device = require('../models').device;

exports.getSensorData = async (req, res) => {
    const { device_id, type } = req.query;

    const data = await SensorData.findOne({
        attributes: [`${type}`],
        where: { device_id, [type]: { [Op.not]: null } },
        order: [['createdAt', 'DESC']],
    });

    res.json({
        code: 200,
        status: 'success',
        data,
    });
};

exports.addSensorData = async (req, res) => {
    const { device_id } = req.params;
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

    // check if device is exists
    const device = await Device.findOne({ where: { id: device_id } });
    if (!device) throw new AppError('Device not found!', 404);

    // check if device belong to user
    if (device.user_id !== user_id) {
        throw new AppError('Access Forbidden!', 403);
    }

    // insert data
    const newData = await SensorData.create({
        id: uuidv4(),
        device_id,
        ph: bodyData.ph,
        tds: bodyData.tds,
        ec: bodyData.ec,
    });

    if (!newData) throw new AppError('Failed add new data!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Sensor data added',
    });
};
