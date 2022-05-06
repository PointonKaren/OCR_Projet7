const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
    validate: {
      isEmail: {
        msg: "Veuillez saisir une adresse email valide",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pictureUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  jobTitle: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

User.associate = (models) => {
  User.hasMany(models.Post);
  User.hasMany(models.Like);
  User.hasMany(models.Comment);
};

module.exports = User;
