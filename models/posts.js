'use strict';
const { Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsTo(models.Categories, {
        foreignKey: "CategoryId",
        sourceKey: "id",
        onDelete: 'SET NULL'
      });
      models.Categories.hasMany(Posts)
      Posts.hasMany(models.Categories, {
        as: "Posts"
      })

      Posts.belongsTo(models.Users, {
        foreignKey: "creatorId",
        onDelete: 'CASCADE'
      });
      models.Users.hasMany(Posts)
      Posts.hasMany(models.Users, {
        foreignKey: "creatorId"
      })
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER,
    img: DataTypes.STRING,
    info: DataTypes.TEXT,
    ban: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    creatorId: DataTypes.INTEGER,
    ball: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};