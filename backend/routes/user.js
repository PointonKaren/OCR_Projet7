const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    signup,
    login,
    getUsers,
    getOneUser,
    modifyUser,
    deleteUser
} = require("../controllers/user");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", auth.verifyToken, getUsers);
router.get("/:id", auth.verifyToken, getOneUser);
router.put("/:id", auth.verifyToken, modifyUser);
router.delete("/:id", auth.verifyToken, deleteUser);

module.exports = router;
