const AppError = require('../utils/AppError');
const { validationResult, matchedData } = require('express-validator');
const { errorMsgTrans } = require('../utils/transform');
const Device = require('../models').device;
const Plant = require('../models').plant;
const Product = require('../models').product;

exports.getPlants = async (req, res) => {
    const plants = await Plant.findAll();

    if (!plants) throw new AppError('Devices not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: plants,
    });
};

exports.getPlant = async (req, res) => {
    const { id } = req.params;

    //get device detail by id
    const plantDetail = await Plant.findOne({
        where: { id },
    });

    if (!plantDetail)
        throw new AppError('The id is not related to any devices', 404);

    res.json({
        code: 200,
        status: 'success',
        data: plantDetail,
    });
};
