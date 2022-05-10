const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    // Vérification de l'id contenu dans le token dans la requête
    if(!req.auth) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.auth = {userId: decodedToken.userId, userRole: decodedToken.userRole};
    }

    // Vérifiaction du content type de la requête

    const contentType = req.headers["content-type"].split(";")[0];

    let userId = "";

    if (contentType === "multipart/form-data") {
      userId = JSON.parse(req.body.data).userId
    } else {
      userId = req.body.userId;
    }

    if (userId && (userId === req.auth.userId || req.auth.userRole === 2 || req.auth.userRole === 1)) {
      // S'il y a un userId dans le corps de la requête et qu'il est le même que celui contenu dans le token
      next();
    } else {
      return res.status(403).json({ message: "Requête non autorisée." });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  verifyToken,
};