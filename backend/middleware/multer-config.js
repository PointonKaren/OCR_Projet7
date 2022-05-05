const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
  "picture/jpg": "jpg",
  "picture/jpeg": "jpg",
  "picture/png": "png",
}; // Dictionnaire des extensions acceptées

/**
 * Configuration du chemin et du nom à appliquer au fichier entrant
 */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "pictures");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replace(" ", "_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

/**
 * Ajout du fichier entrant à la BDD
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      // Quelle que soit la casse, seules les extensions png, jpg et jpeg seront acceptées.
      return callback(null, false);
    }
    callback(null, true);
  },
});

module.exports = upload.single("picture");
