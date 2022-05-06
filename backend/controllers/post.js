const fileSystem = require("fs");

const User = require("../models/User");
const Post = require("../models/Post");

/**
 * Récupérer tous les posts
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllPosts = (req, res, next) => {};

/**
 * Créer un post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createPost = (req, res, next) => {
  const userData = JSON.parse(req.body.user);
  if (!req.file) {
    return res.status(400).json({ error: "Fichier absent ou inattendu." });
  }

  const post = new Post({
    userId: userData.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then(() =>
      res.status(201).json({
        message: "Post publié.",
        postId: post.id,
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
const getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }, include: [{ model: User }] })

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
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const modifyPost = (req, res, next) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deletePost = (req, res, next) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const likePost = (req, res, next) => {};

module.exports = {
  getAllPosts,
  createPost,
  getOnePost,
  modifyPost,
  deletePost,
  likePost,
};
