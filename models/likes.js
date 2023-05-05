'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Likes.belongsTo(models.Posts, {
        foreignKey: "postId"
      });
      models.Posts.hasMany(Likes)
      Likes.belongsTo(models.Users, {
        foreignKey: "userId"
      });
      models.Users.hasMany(Likes)
    }
  }
  Likes.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    dislike: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};