const fileSystem = require("fs");

const Post = require("../models/Post");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllPosts = (req, res, next) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createPost = (req, res, next) => {
  const post = new Post({
    userId: req.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  post
    .save()
    .then(() =>
      res.status(201).json({
        message: "Post publié !",
        postId: post.id,
      })
    )
    .catch((error) => res.status(400).json({ message: error }));
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getOnePost = (req, res, next) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.modifyPost = (req, res, next) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.deletePost = (req, res, next) => {};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.likePost = (req, res, next) => {};
