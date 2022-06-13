'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class province extends Model {
        static associate(models) {}
    }
    province.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'province',
        }
    );
    return province;
};
