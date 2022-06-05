const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
}; // Dictionnaire des extensions acceptées

/**
 * Configuration du chemin et du nom à appliquer au fichier entrant
 */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const userId = req.auth.userId;

    const extension = MIME_TYPES[file.mimetype];
    callback(null, `image_user_${userId}_${Date.now()}.${extension}`); 
    // Nom du fichier modifié pour inclure le nom de l'utilisateur afin d'éviter les doublons et anonymiser les données
  },
});

/**
 * Ajout du fichier entrant à la BDD
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.auth = {
        userId: decodedToken.userId,
        userRole: decodedToken.userRole,
      };
    } catch (err) {
      return callback(null, false);
    }

    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".gif") {
      // Quelle que soit la casse, seules les extensions png, jpg, jpeg et gif seront acceptées.
      return callback(null, false);
    }

    let maxSize = 2 * 1000 * 1000; // 2Mo

    if (file.size > maxSize) {
      return callback(null, false);
    }

    callback(null, true);
  },
});

module.exports = upload.single("image");
