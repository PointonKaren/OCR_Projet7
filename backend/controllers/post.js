const fileSystem = require("fs");

const User = require("../models/User");
const Like = require("../models/Like");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

/**
 * Récupérer tous les posts
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPosts = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      { model: User },
      { model: Like },
      { model: Comment, include: [{ model: User }] },
    ],
  })
    .then((posts) => {
      res.status(200).json({ message: "Liste des posts.", posts: posts });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

/**
 * Créer un post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createPost = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Fichier absent ou inattendu." });
  }
  const data = JSON.parse(req.body.data);
  console.log(data);
  console.log(req);
  const currentUserId = data.userId;
  const postTitle = data.title;

  const post = new Post({
    UserId: currentUserId,
    title: postTitle,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then(() =>
      res.status(201).json({
        message: "Post publié.",
        post: post.id,
      })
    )
    .catch((error) => res.status(400).json({ message: error }));
};

/**
 * Récupérer un post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPost = (req, res, next) => {
  const currentPostId = req.params.id;

  Post.findOne({
    where: { id: currentPostId },
    include: [
      { model: User },
      { model: Like },
      { model: Comment, include: [{ model: User }] },
    ],
  })
    .then((post) => {
      res.status(200).json({
        message: "Post trouvé.",
        post: post,
      });
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};

/**
 * Modifier un post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const modifyPost = (req, res, next) => {
  const currentUserId = req.body.userId;
  const currentUserRole = req.auth.userRole;
  const currentPostId = req.params.id;

  Post.findOne({ where: { id: currentPostId } })
    .then((post) => {
        if(!post) {
            return res.status(404).json({ message: "Post introuvable." });
        }
      if (currentUserId === post.UserId || currentUserRole === 2 || currentUserRole === 1) {
        post.title = req.body.title;

        post
          .save()
          .then(() =>
            res.status(200).json({ message: "Post modifié.", post: post })
          )
          .catch((error) => res.status(400).json({ message: error }));
      } else {
        return res.status(403).json({ message: "Requête non autorisée." });
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deletePost = (req, res, next) => {
  const currentPostId = req.params.id;
  const currentUserId = req.body.userId;

  Post.findOne({ where: { id: currentPostId } })
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: "Le post n'existe pas." });
      }
      if (
        post.UserId === currentUserId ||
        req.auth.userRole === 1 ||
        req.auth.userRole === 2
      ) {
        const filename = post.imageUrl.split("/images/")[1];
        fileSystem.unlink(`images/${filename}`, () => {
          post
            .destroy()
            .then(() => {
              res.status(200).json({ message: "Post supprimé." });
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

/**
 * Liker un post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const likePost = (req, res, next) => {
  const currentUserId = req.body.userId;
  const currentPostId = req.params.id;
  Like.findOne({ where: { UserId: currentUserId, PostId: currentPostId } })
    .then((like) => {
      if (!like) {
        const newLike = new Like({
          UserId: currentUserId,
          PostId: currentPostId,
        });

        newLike
          .save()
          .then(() =>
            res.status(201).json({
              message: "Like ajouté.",
            })
          )
          .catch((error) => res.status(400).json({ message: error }));
      } else {
        like
          .destroy()
          .then(() =>
            res.status(200).json({
              message: "Like retiré.",
            })
          )
          .catch((error) => res.status(400).json({ message: error }));
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  modifyPost,
  deletePost,
  likePost,
};
