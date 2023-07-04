const express = require("express");

const authController = require("../controllers/auth");


const router = express.Router();


router.post("/auth/register", authController.register);

router.post("/auth/login", authController.login);

router.post("/auth/refresh_access_token", authController.refreshAccessToken);

module.exports = router;