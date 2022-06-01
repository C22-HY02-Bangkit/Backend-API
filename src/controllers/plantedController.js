const { matchedData } = require('express-validator');
const AppError = require('../utils/AppError');

const Planted = require('../models').planted;
const Device = require('../models').device;

exports.getPlanted = async (req, res) => {
    const { id } = req.params;
    const { id: user_id } = req.user;

    // check if planted is exists
    const planted = await Planted.findOne({ where: { id } });
    if (!planted) throw new AppError('Planted not found!', 404);

    // check if device belong to user
    const device = await Device.findOne({ where: { id: planted.device_id } });
    if (device.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    res.json({
        code: 200,
        status: 'success',
        data: planted,
    });
};

exports.addPlanted = async (req, res) => {
    const { id: user_id } = req.user;

    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    // check if device belong to user
    const device = await Device.findOne({ where: { id: bodyData.device_id } });
    if (device.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    //add new device
    const newPlanted = await Planted.create({
        id: uuidv4(),
        plant_id: bodyData.plant_id,
        device_id: bodyData.device_id,
        ph: bodyData.ph,
        tds: bodyData.tds,
        ec: bodyData.ec,
    });

    //check new planted
    if (!newPlanted) throw new AppError('Add Planted failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Device added!',
        data: newPlanted,
    });
};

exports.udpatePlanted = async (req, res) => {
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

    const planted = await Planted.findOne({ where: { id } });
    if (!planted) throw new AppError('Planted not found!', 404);

    const device = await Device.findOne({ where: { id: planted.device_id } });
    if (!device) throw new AppError('Device not found!', 404);

    if (device.user_id !== user_id) {
        throw new AppError('Access forbidden!', 403);
    }

    // update planted
    const updatePlanted = await planted.update({ ...bodyData });

    if (!updatePlanted) throw new AppError('Update planted Failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update planted successfully!',
        data: updatePlanted,
    });
};
