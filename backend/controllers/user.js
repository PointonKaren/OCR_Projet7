const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordValidator = require("password-validator");
require("dotenv").config();

/**
 * S'enregistrer sur le site
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.signup = (req, res, next) => {
  console.log("bloublou");
};

/**
 * Se log sur le site
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.login = (req, res, next) => {
  console.log("bloubloublou");
};
