'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class device extends Model {
        static associate(models) {
            device.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            });

            device.hasMany(models.sensor_data, {
                foreignKey: 'device_id',
                as: 'sensor_datas',
            });
        }
    }
    device.init(
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
    return device;
};
