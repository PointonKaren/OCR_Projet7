const http = require("http");
const app = require("./app");
require("dotenv").config();

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

// Importing the database model
const sequelize = require("./utils/database");

// Importing all models
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Like = require("./models/Like");

const models = { User: User, Post: Post, Comment: Comment, Like: Like };

User.associate(models);
Post.associate(models);
Comment.associate(models);
Like.associate(models);

sequelize
  .sync()
  .then(() => {
    console.log("Base de données synchronisée");
    // Se synchronise d'abord à la BDD avant de lancer le serveur
    server.on("error", errorHandler);
    server.on("listening", () => {
      const address = server.address();
      const bind =
        typeof address === "string" ? "pipe " + address : "port " + port;
      console.log("Listening on " + bind);
    });

    server.listen(port);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });


