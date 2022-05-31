'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class planted extends Model {
        static associate(models) {}
    }
    planted.init(
        {
            plant_id: DataTypes.STRING,
            device_id: DataTypes.STRING,
            ph: DataTypes.INTEGER,
            tds: DataTypes.INTEGER,
            ec: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'planted',
        }
    );
    return planted;
};
