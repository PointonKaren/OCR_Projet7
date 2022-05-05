const jwt = require("jsonwebtoken");
require("dotenv").config();

const decodeToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return { userId: decodeToken.userId, userRole: decodedToken.userRole };
};

exports.verifyToken = (req, res, next) => {
  try {
    // Vérification de l'id contenu dans le token dans la requête

    req.auth = decodeToken(req);

    if (req.body.userId && req.body.userId == req.auth.userId) {
      // S'il y a un userId dans le corps de la requête et qu'il est le même que celui contenu dans le token
      next();
    } else {
      throw "Requête non autorisée.";
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
