const express = require("express");
const courseController = require("../controllers/course");
const authMD = require("../middleware/authenticated");
const multiparty = require("connect-multiparty");

const uploadMD = multiparty({ uploadDir: "./uploads/course"});
const router = express.Router();

router.get("/course/courses", courseController.getCourses);

router.post("/course/course", [authMD.asureAuth, uploadMD], courseController.createCourse);

router.patch("/course/course/:id", [authMD.asureAuth, uploadMD], courseController.updateCourse);

router.delete("/course/course/:id", [authMD.asureAuth], courseController.deleteCourse);

module.exports = router;
