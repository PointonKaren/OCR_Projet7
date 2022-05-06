const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Comment = sequelize.define("Comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  Comment.belongsTo(models.Post, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
};

module.exports = Comment;