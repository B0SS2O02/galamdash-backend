'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  TagLists.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TagLists',
  });
  return TagLists;
};