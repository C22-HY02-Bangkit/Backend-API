'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verify_user: DataTypes.BOOLEAN,
    email_verify_token: DataTypes.STRING,
    email_verify_expires: DataTypes.DATE,
    password_change_at: DataTypes.DATE,
    password_reset_token: DataTypes.STRING,
    password_reset_expires: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};