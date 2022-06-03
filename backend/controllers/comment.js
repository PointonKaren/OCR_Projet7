const Comment = require("../models/Comment");
const User = require("../models/User");

/**
 * Créer un commentaire
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createComment = (req, res, next) => {
  Comment.create({
    UserId: req.body.data.userId,
    PostId: req.params.id,
    message: req.body.data.message,
  })
    .then(() =>
      res.status(201).json({
        message: "Commentaire publié.",
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: error,
      })
    );
};

/**
 * Récupérer un commentaire
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPostComments = (req, res, next) => {
  const currentPostId = req.body.postId;

  Comment.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      PostId: currentPostId,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((comments) => {
      res
        .status(200)
        .json({ message: "Liste des commentaires.", comments: comments });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

/**
 * Supprimer un commentaire
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteComment = (req, res, next) => {
  console.log(req.body);
  const currentUserId = req.body.userId;
  const currentUserRole = req.auth.userRole;
  const currentCommentId = req.params.id;
  Comment.findOne({ where: { id: currentCommentId } })
    .then((comment) => {
      if (!comment) {
        return res
          .status(404)
          .json({ message: "Le commentaire n'existe pas." });
      }
      if (
        currentUserId === comment.UserId ||
        currentUserRole === 1 ||
        currentUserRole === 2
      ) {
        comment
          .destroy()
          .then(() => {
            res.status(200).json({ message: "Commentaire supprimé." });
          })
          .catch((error) => {
            res.status(400).json({ message: error });
          });
      } else {
        res.status(403).json({ message: "Requête non autorisée." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

/**
 * Modifier un commentaire
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const modifyComment = (req, res, next) => {
  const currentUserId = req.body.userId;
  const currentUserRole = req.auth.userRole;
  const currentCommentId = req.params.id;

  Comment.findOne({
    where: {
      id: currentCommentId,
    },
  }).then((comment) => {
    if (!comment) {
      return res.status(404).json({ message: "Le commentaire n'existe pas." });
    }

    if (currentUserId === comment.UserId || currentUserRole === 2) {
      comment.message = req.body.message;
    }
    comment
      .save()
      .then((e) => {
        res.status(200).json({
          message: "Commentaire modifié.",
          comment: comment,
        });
      })
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  });
};

module.exports = {
  createComment,
  getPostComments,
  deleteComment,
  modifyComment,
};
