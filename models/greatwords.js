'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Greatwords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Greatwords.init({
    content: DataTypes.STRING,
    avtor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Greatwords',
  });
  return Greatwords;
};