'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class plant extends Model {
        static associate(models) {}
    }
    
    plant.init(
        {
            name: DataTypes.STRING,
            min_ph: DataTypes.FLOAT,
            max_ph: DataTypes.FLOAT,
            min_tds: DataTypes.FLOAT,
            max_tds: DataTypes.FLOAT,
            min_ec: DataTypes.FLOAT,
            max_ec: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'plant',
        }
    );
    return plant;
};
