'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class sensor_data extends Model {
        static associate(models) {
            sensor_data.belongsTo(models.device, {
                foreignKey: 'device_id',
                as: 'device',
            });
        }
    }
    sensor_data.init(
        {
            device_id: DataTypes.UUID,
            ph: DataTypes.INTEGER,
            tds: DataTypes.INTEGER,
            ec: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'sensor_data',
        }
    );
    return sensor_data;
};
