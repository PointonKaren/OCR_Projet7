const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getPasswordSchema = () => {
  const passwordSchema = new passwordValidator();

  passwordSchema
    .is()
    .min(8, "Le mot de passe doit contenir minimum 8 caractères.")
    .is()
    .max(100, "Le mot de passe doit contenir maximum 100 caractères.")
    .has()
    .uppercase(1, "Le mot de passe doit contenir au moins 1 majuscule.")
    .has()
    .lowercase(1, "Le mot de passe doit contenir au moins 1 minuscule.")
    .has()
    .digits(2, "Le mot de passe doit contenir au moins 2 chiffres.")
    .has()
    .not()
    .spaces();

    return passwordSchema;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      userRole: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};


module.exports = {
  getPasswordSchema,
  generateToken
};
