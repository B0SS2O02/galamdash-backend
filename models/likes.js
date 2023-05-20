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
        foreignKey: "post",
        onDelete: 'CASCADE'
      });
      models.Posts.hasOne(Likes, {
        foreignKey: "post"
      })
      Likes.hasOne(models.Posts, {
        foreignKey: "post"
      })

      Likes.belongsTo(models.Users, {
        foreignKey: "user",
        onDelete: 'CASCADE'
      });
      models.Users.hasMany(Likes, {
        foreignKey: "user"
      })
    }
  }
  Likes.init({
    post: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      defaultValue: 'like'
    }
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};