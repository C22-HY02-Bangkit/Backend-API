const AppError = require('../utils/AppError');
const Product = require('../models').product;

exports.getProducts = async (req, res) => {
    // get all products
    const products = await Product.findAll();

    if (!products.length) throw new AppError('Products not found!', 404);

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
