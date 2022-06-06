'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class admin extends Model {
        static associate(models) {}
    }
    admin.init(
        {
            username: DataTypes.UUID,
            password: DataTypes.STRING,
            is_active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'admin',
        }
    );
    return admin;
};
