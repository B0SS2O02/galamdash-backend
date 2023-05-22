'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Posts, {
        foreignKey: 'post',
        onDelete: 'CASCADE'
      });
      models.Posts.hasMany(Comments, {
        foreignKey: 'post'
      })
      Comments.hasMany(models.Posts, {
        foreignKey: 'post'
      });
    }
  }
  Comments.init({
    post: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    parent: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};