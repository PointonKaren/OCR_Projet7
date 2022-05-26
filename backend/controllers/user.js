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
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Veuillez remplir tous les champs.",
    });
  }

  const passwordValidation = validatePassword(password);
  const emailValidation = validateEmail(email);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      message: passwordValidation.message,
    });
  }

  if (emailValidation.valid) {
    // Si la syntaxe du mail utilisé est correcte
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashedPassword,
          pictureUrl: `${req.protocol}://${req.get(
            "host"
          )}/images/default_profile_picture.png`,
        });
        user
          .save()
          .then(() =>
            res.status(201).json({
              message: "Utilisateur créé.",
              email: email,
              firstName: firstName,
              lastName: lastName,
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
  const { email, password } = req.body;

  User.findOne({ where: { email: email } }) // Est-ce que l'utilisateur existe ?
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "Mail et/ou mot de passe incorrect." });
      }
      bcrypt
        .compare(password, user.password)
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
            lastName: user.lastName,
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
  if (req.auth.userRole === 2) {
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
  const currentUserId = req.params.id;

  User.findOne({ where: { id: currentUserId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }

      if (currentUserId === req.auth.userId || req.auth.userRole === 2) {
        return res
          .status(200)
          .json({ message: "Utilisateur trouvé.", user: user });
      } else {
        return res.status(200).json({
          message: "Utilisateur trouvé.",
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            pictureUrl: user.pictureUrl,
            jobTitle: user.jobTitle,
            bio: user.bio,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
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

  const currentUserId = parseInt(req.params.id);
  const reqAuthUserId = parseInt(req.auth.userId);
  const authUserRole = parseInt(req.auth.userRole);

  User.findOne({ where: { id: currentUserId } })
    .then((user) => {
      if (currentUserId === reqAuthUserId || authUserRole === 2) {
        if (req.file) {
          if (user.pictureUrl) {
            const pictureName = user.pictureUrl.split("images/")[1];
            fileSystem.unlink(`images/${pictureName}`, () => {});
          }
          user.pictureUrl = updatedUser.pictureUrl;
        }

        bcrypt
          .compare(updatedUser.password, user.password)
          .then((samePassword) => {
            if (!samePassword) {
              bcrypt
                .hash(updatedUser.password, 10)
                .then((hashedPassword) => {
                  user.email = updatedUser.email;
                  user.firstName = updatedUser.firstName;
                  user.lastName = updatedUser.lastName;
                  user.jobTitle = updatedUser.jobTitle;
                  user.bio = updatedUser.bio;
                  user.password = hashedPassword;

                  user
                    .save()
                    .then(() =>
                      res
                        .status(200)
                        .json({ message: "Utilisateur modifié.", user: user })
                    )
                    .catch((error) => res.status(400).json({ message: error }));
                })
                .catch((error) => {
                  return res.status(500).json({ message: error });
                });
            } else {
              user.email = updatedUser.email;
              user.firstName = updatedUser.firstName;
              user.lastName = updatedUser.lastName;
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
            }
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
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
  User.findOne({ where: { id: currentUserId } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }
      if (currentUserId === req.auth.userId || req.auth.userRole === 2) {
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
      res.status(500).json({ message: "L'utilisateur n'existe pas !" });
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
