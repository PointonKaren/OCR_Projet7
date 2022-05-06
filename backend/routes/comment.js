const express = require("express");
const router = express.Router();

const { getOneComment, deleteComment, modifyComment } = require("../controllers/comment");

const auth = require("../middleware/auth");

router.get("/:id", auth.verifyToken, getOneComment);
router.delete("/:id", auth.verifyToken, deleteComment);
router.put("/:id", auth.verifyToken, modifyComment);

module.exports = router;
