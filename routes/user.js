const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.get("/login", UserController.login);
router.post("/signup", UserController.signup);

module.exports = router;
