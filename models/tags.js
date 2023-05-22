'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tags.belongsTo(models.Posts, {
        foreignKey: 'post',
        onDelete: 'CASCADE'
      });
      models.Posts.hasMany(Tags, {
        foreignKey: 'post'
      })
      Tags.hasMany(models.Posts, {
        foreignKey: 'post'
      });

      Tags.belongsTo(models.TagLists, {
        foreignKey: 'tag',
        onDelete: 'CASCADE'
      });
      models.TagLists.hasMany(Tags, {
        foreignKey: 'tag'
      })
      Tags.hasMany(models.TagLists, {
        foreignKey: 'tag'
      });
    }
  }
  Tags.init({
    post: DataTypes.INTEGER,
    tag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};