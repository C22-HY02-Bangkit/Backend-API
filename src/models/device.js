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

            Device.belongsTo(models.product, {
                foreignKey: 'product_id',
                as: 'product',
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
            product_id: DataTypes.UUID,
            status: DataTypes.BOOLEAN,
            description: DataTypes.STRING,
            min_ph: DataTypes.FLOAT,
            max_ph: DataTypes.FLOAT,
            min_tds: DataTypes.FLOAT,
            max_tds: DataTypes.FLOAT,
            min_ec: DataTypes.FLOAT,
            max_ec: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'device',
        }
    );
    return Device;
};
