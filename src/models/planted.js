'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class planted extends Model {
        static associate(models) {
            planted.belongsTo(models.device, {
                foreignKey: 'device_id',
                as: 'device',
            });
            planted.belongsTo(models.plant, {
                foreignKey: 'plant_id',
                as: 'plant',
            });
        }
    }
    planted.init(
        {
            plant_id: DataTypes.UUID,
            device_id: DataTypes.UUID,
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
