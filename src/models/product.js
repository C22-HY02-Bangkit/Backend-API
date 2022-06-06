'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {}
    }
    product.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'product',
        }
    );
    return product;
};
