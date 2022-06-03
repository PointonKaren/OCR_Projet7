const Sequelize = require("sequelize");
require("dotenv").config();

// On crée une instance de sequelize

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

// On se connecte à la base de données

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion établie !");
  })
  .catch((err) => {
    console.error("Erreur de connexion : ", err);
    process.exit(1);
  });

// On exporte l'instance de sequelize connecté à la base de données

module.exports = sequelize;
