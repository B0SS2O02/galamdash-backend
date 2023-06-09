'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unconfirmed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unconfirmed.belongsTo(models.Categories, {
        foreignKey: "CategoryId",
        sourceKey: "id",
        onDelete: 'SET NULL'
      });
      models.Categories.hasMany(Unconfirmed)
      Unconfirmed.hasMany(models.Categories, {
        as: "Unconfirmed"
      })
      Unconfirmed.belongsTo(models.Users, {
        foreignKey: "creatorId",
        onDelete: 'CASCADE'
      });
      models.Users.hasMany(Unconfirmed, {
        foreignKey: "creatorId"
      })
      Unconfirmed.hasMany(models.Users, {
        foreignKey: "creatorId"
      })
    }
  }
  Unconfirmed.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    img: DataTypes.STRING,
    info: DataTypes.TEXT,
    creatorId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Unconfirmed',
  });
  return Unconfirmed;
};