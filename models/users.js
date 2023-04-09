'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    nick: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    img: {
      type: DataTypes.STRING,
      defaultValue: 'public/images/default_avatar.jpg'
    },
    info:  {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    ball: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ban: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
      sequelize,
      modelName: 'Users',
    });
  return Users;
};