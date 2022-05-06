const jwt = require("jsonwebtoken");
require("dotenv").config();

// TODO: Voir avec Benjy pourquoi body vide ?
// TODO: Voir avec Benjy comment sécuriser l'ajout pour que seul un user enregistré puisse poster

const verifyToken = (req, res, next) => {
  try {
    // Vérification de l'id contenu dans le token dans la requête
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.auth = { userId: decodedToken.userId, userRole: decodedToken.userRole };
    next();
    // if (contentType == "multipart/form-data") {
    //   userId = JSON.parse(req.body.data).userId;
    // } else {
    //   userId = req.body.userId;
    // }

    // if (userId && userId === req.auth.userId) {
    //   // S'il y a un userId dans le corps de la requête et qu'il est le même que celui contenu dans le token
    //   next();
    // } else {
    //   return res.status(403).json({ message: "Requête non autorisée." });
    // }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  verifyToken,
};
