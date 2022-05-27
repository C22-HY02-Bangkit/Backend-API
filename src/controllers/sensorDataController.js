const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const { checkBodyPayload } = require('../utils/validator');
const { errorMsgTrans } = require('../utils/transform');

const SensorData = require('../models').sensor_data;
const Device = require('../models').device;

exports.addSensorData = async (req, res) => {
    const { device_id } = req.params;
    const { id: user_id } = req.user;
    const bodyData = req.body;

    // check body payload
    checkBodyPayload(bodyData, ['ph', 'tds', 'ec']);

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

    // check if device belong to user
    const device = await Device.findOne({ where: { id: device_id, user_id } });
    if (!device) throw new AppError('Forbidden!', 403);

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
        message: 'Data added!',
    });
};
