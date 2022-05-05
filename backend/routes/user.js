const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth.verifyToken, userCtrl.getUsers);
router.get("/:id", auth.verifyToken, userCtrl.getUser);
router.put("/:id", auth.verifyToken, userCtrl.modifyUser);
router.delete("/:id", auth.verifyToken, userCtrl.deleteUser);

module.exports = router;
