const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const {
  signup,
  login,
  getUsers,
  getUser,
  modifyUser,
  deleteUser,
} = require("../controllers/user");

router.post("/signup", signup);
router.post("/login", login);
router.post("/", auth.verifyToken, getUsers);
router.post("/:id", auth.verifyToken, getUser);
router.put("/:id", multer, auth.verifyToken, modifyUser);
router.delete("/:id", auth.verifyToken, deleteUser);

module.exports = router;
