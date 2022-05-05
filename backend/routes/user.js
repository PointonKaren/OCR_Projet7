const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth.verifyToken, userCtrl.getOneUser);
router.get("/", auth.verifyToken, userCtrl.getAllUsers);
router.delete("/:id", auth.verifyToken, userCtrl.deleteUser);
router.put("/:id", auth.verifyToken, userCtrl.modifyUser);

module.exports = router;
