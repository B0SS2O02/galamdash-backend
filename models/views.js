'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Views.belongsTo(models.Posts, {
        foreignKey: 'post',
        onDelete: 'CASCADE'
      })
      models.Posts.hasMany(Views, {
        foreignKey: 'post'
      })
      Views.hasMany(models.Posts, {
        foreignKey: 'post'
      })
      Views.belongsTo(models.Users, {
        foreignKey: 'user'
      })
      models.Users.hasMany(Views, {
        foreignKey: 'user'
      })
      Views.hasMany(models.Users, {
        foreignKey: 'user'
      })
    }
  }
  Views.init({
    post: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Views',
  });

  return Views;
};