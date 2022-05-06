const bcrypt = require("bcrypt");

const fileSystem = require("fs");

require("dotenv").config();

const User = require("../models/User");
const {
  validatePassword,
  validateEmail,
  generateToken,
} = require("../utils/common");

/**
 * S'enregistrer sur le site
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const signup = (req, res, next) => {
  const passwordValidation = validatePassword(req.body.password);
  const emailValidation = validateEmail(req.body.email);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      message: passwordValidation.message,
    });
  }

  if (emailValidation.valid) {
    // Si la syntaxe du mail utilisé est correcte
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          surname: req.body.surname,
          password: hashedPassword,
        });
        user
          .save()
          .then(() =>
            res.status(201).json({
              message: "Utilisateur créé.",
              email: req.body.email,
              firstName: req.body.firstName,
              surname: req.body.surname,
            })
          )
          .catch((error) => res.status(400).json({ message: error }));
      })
      .catch((error) => res.status(500).json({ message: error }));
  } else {
    return res.status(400).json({ message: "Syntaxe de mail incorrecte." });
  }
};

/**
 * Se log sur le site
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }) // Est-ce que l'utilisateur existe ?
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Mail et/ou mot de passe incorrect." });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((samePassword) => {
          if (!samePassword) {
            return res
              .status(401)
              .json({ message: "Mail et/ou mot de passe incorrect." });
          }
          res.status(200).json({
            userId: user.id,
            role: user.role,
            token: generateToken(user),
            firstName: user.firstName,
            surname: user.surname,
            pictureUrl: user.pictureUrl,
            jobTitle: user.jobTitle,
            bio: user.bio,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error });
    });
};

/**
 * Récupérer tous les utilisateurs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUsers = (req, res, next) => {
  if (req.auth.userRole == 2) {
    User.findAll()
      .then((users) => {
        res
          .status(200)
          .json({ message: "Liste des utilisateurs", users: users });
      })
      .catch((error) => {
        res.status(400).json({ message: error });
      });
  } else {
    return res.status(403).json({ message: "Requête non autorisée." });
  }
};

/**
 * Récupérer un utilisateur précis
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUser = (req, res, next) => {
  // TODO: corriger le fait qu'on peut "trouver" un user qui n'existe pas
  // TODO: permettre d'afficher le profil (en masquant les données sensibles) d'un autre user quand on n'est ni modo ni admin
  const currentUserId = req.params.id;

  User.findOne({ where: { id: currentUserId } })
    .then((user) => {
      if (req.auth.userId == currentUserId || req.auth.userRole == 2) {
        return res
          .status(200)
          .json({ message: "Utilisateur trouvé.", user: user });
      } else {
        return res.status(403).json({ message: "Requête non autorisée." });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};

/**
 * Modifier un utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const modifyUser = (req, res, next) => {
  let updatedUser;
  // TODO: Faire en sorte que l'image de profil ne dépasse un certain format/poids
  // TODO: Corriger la modif user qui ne semble pas fonctionner
  // TODO: Faire en sorte que l'user puisse modifier son mdp en le cryptant
  // 2 cas possibles : soit l'utilisateur modifie notamment l'image, soit il ne touche pas à l'image et ne modifie que le contenu du formulaire
  if (req.file) {
    updatedUser = {
      ...JSON.parse(req.body.data),
      pictureUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  } else {
    if (!req.body.data) {
      updatedUser = { ...req.body };
    } else {
      return res.status(400).json({ message: "Format de fichier inattendu." });
    }
  }

  const currentUserId = req.params.id;

  User.findOne({ where: { id: currentUserId } })
    .then((user) => {
      if (currentUserId == req.auth.userId || req.auth.userRole == 2) {
        if (req.file) {
          const pictureName = user.pictureUrl.split("images/")[1];
          fileSystem.unlink(`images/${pictureName}`, () => {});
          user.pictureUrl = updatedUser.pictureUrl;
        }
        user.firstName = updatedUser.firstName;
        user.surname = updatedUser.surname;
        user.jobTitle = updatedUser.jobTitle;
        user.bio = updatedUser.bio;

        user
          .save()
          .then(() =>
            res
              .status(200)
              .json({ message: "Utilisateur modifié.", user: user })
          )
          .catch((error) => res.status(400).json({ message: error }));
      } else {
        return res.status(403).json({ message: "Requête non autorisée." });
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

/**
 * Supprimer un utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUser = (req, res, next) => {
  const currentUserId = req.params.id;
  // TODO: Trouver et corriger ce qui empêche la fonction de fonctionner (erreur 500 sur Postman)
  User.findOne({ where: { id: currentUserId } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }
      if (currentUserId == req.auth.userId || req.auth.userRole == 2) {
        const filename = user.pictureUrl.split("/images/")[1];
        fileSystem.unlink(`images/${filename}`, () => {
          user
            .destroy()
            .then(() => {
              res.status(200).json({ message: "Utilisateur supprimé." });
            })
            .catch((error) => {
              res.status(400).json({ message: error });
            });
        });
      } else {
        res.status(403).json({ message: "Requête non autorisée." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

module.exports = {
  signup,
  login,
  getUsers,
  getUser,
  modifyUser,
  deleteUser,
};
