'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drafts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Drafts.belongsTo(models.Users, {
        foreignKey: "creatorId"
      })
      models.Users.hasMany(Drafts, {
        foreignKey: 'creatorId'
      })
      Drafts.hasMany(models.Users, {
        foreignKey: 'creatorId'
      })
    }
  }
  Drafts.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    img: DataTypes.STRING,
    info: DataTypes.TEXT,
    creatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Drafts',
  });
  return Drafts;
};