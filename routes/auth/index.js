const express = require("express");

const loginController = require("../../controller/auth/loginController");
const logoutController = require("../../controller/auth/logoutController");
const refreshTokenController = require("../../controller/auth/refreshTokenController");
const registerController = require("../../controller/auth/registerController");

const router = express.Router();
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/logout", logoutController.logout);
router.post("/refreshToken", refreshTokenController.refreshToken);

module.exports = router;
