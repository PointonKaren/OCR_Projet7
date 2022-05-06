const express = require("express");
const router = express.Router();

const {
  createPost,
  getOnePost,
  deletePost,
  modifyPost,
  getAllPosts,
  likePost,
} = require("../controllers/post");

const { createComment } = require("../controllers/comment");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth.verifyToken, getAllPosts);
router.post("/", auth.verifyToken, multer, createPost);
router.get("/:id", auth.verifyToken, getOnePost);
router.put("/:id", auth.verifyToken, multer, modifyPost);
router.delete("/:id", auth.verifyToken, deletePost);
router.post("/:id/like", auth.verifyToken, likePost);
router.post("/:id/comment", auth.verifyToken, createComment);

module.exports = router;
