const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");

router.get("/", auth.verifyToken, postCtrl.getAllPosts);
router.post("/", auth.verifyToken, postCtrl.createPost);
router.get("/:id", auth.verifyToken, postCtrl.getOnePost);
router.put("/:id", auth.verifyToken, postCtrl.modifyPost);
router.delete("/:id", auth.verifyToken, postCtrl.deletePost);
router.post("/:id/like", auth.verifyToken, postCtrl.likePost);
router.post("/:id/comment", auth.verifyToken, commentCtrl.addComment);

module.exports = router;
