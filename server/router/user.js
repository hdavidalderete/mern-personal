const express = require("express");
const multiparty = require("connect-multiparty");
const userController = require("../controllers/user");
const authMD = require("../middleware/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/avatar"});
const router = express.Router();

router.get("/user/me", [authMD.asureAuth], userController.getMe);

router.get("/user/users", [authMD.asureAuth], userController.getUsers);

router.post("/user/user", [authMD.asureAuth, md_upload], userController.createUser);

router.patch("/user/user/:id", [authMD.asureAuth, md_upload], userController.updateUser);

router.delete("/user/user/:id", [authMD.asureAuth], userController.deleteUser);

module.exports = router;
