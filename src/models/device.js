'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Device extends Model {
        static associate(models) {
            Device.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            });

            Device.hasMany(models.sensor_data, {
                foreignKey: 'device_id',
                as: 'sensor_datas',
            });
        }
    }
    Device.init(
        {
            user_id: DataTypes.STRING,
            name: DataTypes.STRING,
            code: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'device',
        }
    );
    return Device;
};
