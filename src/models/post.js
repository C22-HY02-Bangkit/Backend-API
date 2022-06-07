'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class post extends Model {
        static associate(models) {}
    }
    post.init(
        {
            user_id: DataTypes.UUID,
            text: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'post',
        }
    );
    return post;
};
