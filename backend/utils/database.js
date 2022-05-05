const Sequelize = require("sequelize");
require("dotenv").config();

const getSequelize = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
    }
  );
  return sequelize;
};

exports.authenticate = () => {
  sequelize = getSequelize();

  sequelize
    .authenticate()
    .then(() => console.log("La connexion à la base de données a été établie."))
    .catch((err) =>
      console.log("Impossible de se connecter à la base de données :", err)
    );
};

exports.getSequelize = getSequelize;
