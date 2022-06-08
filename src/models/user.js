'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.device, {
                foreignKey: 'user_id',
                as: 'devices',
            });

            User.hasOne(models.user_profile, {
                foreignKey: 'user_id',
                as: 'detail',
            });
        }
    }
    User.init(
        {
            fullname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            verify_user: DataTypes.BOOLEAN,
            email_verify_token: DataTypes.STRING,
            email_verify_expires: DataTypes.DATE,
            password_change_at: DataTypes.DATE,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'user',
        }
    );

    return User;
};
