'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product_image extends Model {
        static associate(models) {}
    }
    product_image.init(
        {
            product_id: DataTypes.UUID,
            url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'product_image',
        }
    );
    return product_image;
};
