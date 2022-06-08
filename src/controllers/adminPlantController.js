const { matchedData, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const Plant = require('../models').plant;

exports.getPlants = async (req, res) => {
    // get all plants
    const plants = await Plant.findAll();

    if (!plants.length) throw new AppError('Plants not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: plants,
    });
};

exports.getPlant = async (req, res) => {
    const { id } = req.params;

    // get plant by id
    const plant = await Plant.findOne({ where: { id } });

    if (!plant) throw new AppError('Plant not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: plant,
    });
};

exports.addPlant = async (req, res) => {
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    const newProduct = await Plant.create({
        id: uuidv4(),
        ...bodyData,
    });

    if (!newProduct) throw new AppError('Add plant failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Add plant success',
        data: newProduct,
    });
};

exports.editPlant = async (req, res) => {
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

    // find plant by id
    const plant = await Plant.findOne({ where: { id } });
    if (!plant) throw new AppError('Plant not found!', 404);

    // update plant
    const updateProduct = await plant.update({ ...bodyData });
    if (!updateProduct) throw new AppError('Update plant failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update plant success',
        data: updateProduct,
    });
};

exports.removePlant = async (req, res) => {
    const { id } = req.params;

    // find plant by id
    const plant = await Plant.findOne({ where: { id } });
    if (!plant) throw new AppError('Plant not found!', 404);

    // delete plant
    const deleteProduct = await plant.destroy();
    if (!deleteProduct) throw new AppError('Delete plant failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Delete plant success!',
        data: plant,
    });
};
