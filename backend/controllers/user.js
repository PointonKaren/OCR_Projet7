const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const fileSystem = require("fs");

require("dotenv").config();

const User = require("../models/User");
const { getPasswordSchema, generateToken } = require("../utils/common");

/**
 * S'enregistrer sur le site
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const signup = (req, res, next) => {
  const passwordSchema = getPasswordSchema();

  if (!passwordSchema.validate(req.body.password)) {
    let errorMessage = "";
    const errors = passwordSchema.validate(req.body.password, {
      details: true,
    });
    for (let i in errors) {
      errorMessage += errors[i].message + " ";
    }
    return res.status(400).json({
      message: errorMessage,
    });
  }

  if (emailValidator.validate(req.body.email)) {
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
const getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (req.auth.userId == req.params.id || req.auth.userRole == 2) {
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
  // 2 cas possibles : soit l'utilisateur modifie notamment l'image, soit il ne touche pas à l'image et ne modifie que le contenu du formulaire
  if (req.file) {
    updatedUser = {
      ...JSON.parse(req.body.user),
      pictureUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    };
  } else {
    if (!req.body.user) {
      updatedUser = { ...req.body };
    } else {
      return res.status(400).json({ message: "Format de fichier inattendu." });
    }
  }

  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (req.params.id == req.auth.userId || req.auth.userRole == 2) {
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
 * Supprimer une sauce
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }
      if (req.params.id == req.auth.userId || req.auth.userRole == 2) {
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
  getOneUser,
  modifyUser,
  deleteUser,
};
