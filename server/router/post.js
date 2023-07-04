const express = require("express");
const postController = require("../controllers/post");
const authMD = require("../middleware/authenticated");
const multiparty = require("connect-multiparty");

const uploadMD = multiparty({ uploadDir: "./uploads/blog"});
const router = express.Router();

router.get("/post/posts", postController.getPosts);

router.get("/post/post/:path", postController.getPost);

router.post("/post/post", [authMD.asureAuth, uploadMD], postController.createPost);

router.patch("/post/post/:id", [authMD.asureAuth, uploadMD], postController.updatePost);

router.delete("/post/post/:id", [authMD.asureAuth], postController.deletePost);

module.exports = router;
