'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_profile extends Model {
        static associate(models) {
            user_profile.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'user',
            });

            user_profile.belongsTo(models.province, {
                foreignKey: 'province_id',
                as: 'province',
            });
        }
    }
    user_profile.init(
        {
            user_id: DataTypes.UUID,
            location: DataTypes.JSON,
            phone_number: DataTypes.STRING,
            province_id: DataTypes.INTEGER,
            location_privacy: DataTypes.BOOLEAN,
            planted_privacy: DataTypes.BOOLEAN,
            address: DataTypes.STRING,
            instagram_url: DataTypes.STRING,
            twitter_url: DataTypes.STRING,
            facebook_url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user_profile',
        }
    );
    return user_profile;
};
