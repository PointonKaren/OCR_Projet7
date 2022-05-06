const express = require("express");
const router = express.Router();

const {
  getPostComments,
  deleteComment,
  modifyComment,
} = require("../controllers/comment");

const auth = require("../middleware/auth");

router.get("/", auth.verifyToken, getPostComments);
router.delete("/:id", auth.verifyToken, deleteComment);
router.put("/:id", auth.verifyToken, modifyComment);

module.exports = router;
