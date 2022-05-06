const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Like = sequelize.define("Like", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
});
Like.associate = (models) => {
  Like.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  Like.belongsTo(models.Post, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
};

module.exports = Like;
