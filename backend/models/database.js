const Sequelize = require("sequelize");
const databaseUtils = require("../utils/database");
require("dotenv").config();

const database = { models: {} };

const sequelize = databaseUtils.getSequelize();
const modelNames = ["User", "Post", "Like", "Comment"];

for (i in modelNames) {
  const model = require(`./${modelNames[i]}`);
  database.models[modelNames[i]] = model(sequelize, Sequelize.DataTypes);
  if (database.models[modelNames[i]].associate) {
    database.models[modelNames[i]].associate(database.models);
  }
}

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
