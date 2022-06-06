'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Device extends Model {
        static associate(models) {
            Device.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            });

            Device.belongsTo(models.plant, {
                foreignKey: 'plant_id',
                as: 'planted',
            });

            Device.hasMany(models.sensor_data, {
                foreignKey: 'device_id',
                as: 'sensor_datas',
            });
        }
    }
    Device.init(
        {
            user_id: DataTypes.UUID,
            plant_id: DataTypes.UUID,
            name: DataTypes.STRING,
            code: DataTypes.STRING,
            min_ph: DataTypes.INTEGER,
            max_ph: DataTypes.INTEGER,
            min_tds: DataTypes.INTEGER,
            max_tds: DataTypes.INTEGER,
            min_ec: DataTypes.INTEGER,
            max_ec: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'device',
        }
    );
    return Device;
};
