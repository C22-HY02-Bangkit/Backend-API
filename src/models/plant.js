'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class plant extends Model {
        static associate(models) {}
    }
    
    plant.init(
        {
            name: DataTypes.STRING,
            min_ph: DataTypes.INTEGER,
            max_ph: DataTypes.INTEGER,
            min_tds: DataTypes.INTEGER,
            max_tds: DataTypes.INTEGER,
            min_ec: DataTypes.INTEGER,
            max_ec: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'plant',
        }
    );
    return plant;
};
