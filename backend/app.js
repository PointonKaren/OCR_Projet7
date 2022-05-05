const express = require("express");
const helmet = require("helmet");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

const databaseUtils = require("./utils/database");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(helmet());

app.use(express.json());

databaseUtils.authenticate();

app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
