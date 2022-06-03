const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  deletePost,
  modifyPost,
  getPosts,
  likePost,
} = require("../controllers/post");

const { createComment } = require("../controllers/comment");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth.verifyToken, getPosts);
router.put("/", multer, auth.verifyToken, createPost);
router.post("/:id", auth.verifyToken, getPost);
router.put("/:id", multer, auth.verifyToken, modifyPost);
router.delete("/:id", auth.verifyToken, deletePost);
router.post("/:id/like", auth.verifyToken, likePost);
router.post("/:id/comment", auth.verifyToken, createComment);

module.exports = router;
