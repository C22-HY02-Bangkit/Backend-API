'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class post_image extends Model {
        static associate(models) {}
    }
    post_image.init(
        {
            post_id: DataTypes.UUID,
            url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'post_image',
        }
    );
    return post_image;
};
