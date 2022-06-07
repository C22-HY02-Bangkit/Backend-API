const { matchedData, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const { errorMsgTrans } = require('../utils/transform');
const { v4: uuidv4 } = require('uuid');
const User = require('../models').user;
const Admin = require('../models').admin;
const Device = require('../models').device;
const Plant = require('../models').plant;
const Product = require('../models').product;

exports.getProducts = async (req, res) => {
    // get all products
    const products = await Product.findAll();

    if (!products) throw new AppError('Products not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: products,
    });
};

exports.getProduct = async (req, res) => {
    const { id } = req.params;

    // get product by id
    const product = await Product.findOne({ where: { id } });

    if (!product) throw new AppError('Product not found!', 404);

    res.json({
        code: 200,
        status: 'success',
        data: product,
    });
};

exports.addProduct = async (req, res) => {
    // validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errorMsgTrans(errors.array({ onlyFirstError: true }));
        throw new AppError(msg, 400);
    }

    // get body data based on validator
    const bodyData = matchedData(req, { locations: ['body'] });

    const newProduct = await Product.create({
        id: uuidv4(),
        ...bodyData,
    });

    if (!newProduct) throw new AppError('Add product failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Add product success',
        data: newProduct,
    });
};

exports.editProduct = async (req, res) => {
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

    // find product by id
    const product = await Product.findOne({ where: { id } });
    if (!product) throw new AppError('Product not found!', 404);

    // update product
    const updateProduct = await product.update({ ...bodyData });
    if (!updateProduct) throw new AppError('Update product failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Update product success',
        data: updateProduct,
    });
};

exports.removeProduct = async (req, res) => {
    const { id } = req.params;

    // find product by id
    const product = await Product.findOne({ where: { id } });
    if (!product) throw new AppError('Product not found!', 404);

    // delete product
    const deleteProduct = await product.destroy();
    if (!deleteProduct) throw new AppError('Delete product failed!', 400);

    res.json({
        code: 200,
        status: 'success',
        message: 'Delete product success!',
        data: product,
    });
};
