'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_profile extends Model {
        static associate(models) {
            user_profile.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }
    user_profile.init(
        {
            user_id: DataTypes.UUID,
            location: DataTypes.JSON,
            phone_number: DataTypes.STRING,
            province: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user_profile',
        }
    );
    return user_profile;
};
