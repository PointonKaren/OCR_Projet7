const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");

router.get("/:id", auth.verifyToken, commentCtrl.getOneComment);
router.delete("/:id", auth.verifyToken, commentCtrl.deleteComment);
router.put("/:id", auth.verifyToken, commentCtrl.modifyComment);

module.exports = router;
