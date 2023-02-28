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
    name: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: { type: DataTypes.STRING, unique: true },
    is_active: DataTypes.BOOLEAN,
    date_of_birth: DataTypes.DATEONLY,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};