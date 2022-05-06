const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Post = sequelize.define("Post", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: {
      allowNull: true,
    },
    onDelete: "CASCADE",
  });
  Post.hasMany(models.Like);
  Post.hasMany(models.Comment);
};

module.exports = Post;