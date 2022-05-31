'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class plant extends Model {
        static associate(models) {}
    }
    plant.init(
        {
            name: DataTypes.STRING,
            ph: DataTypes.INTEGER,
            tds: DataTypes.INTEGER,
            ec: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'plant',
        }
    );
    return plant;
};
