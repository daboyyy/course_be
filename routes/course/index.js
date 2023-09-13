const express = require("express");

const createCourseController = require("../../controller/course/createCourseController");
const courseSearchController = require("../../controller/course/courseSearchController");

const router = express.Router();
router.post("/create", createCourseController.createCourse);
router.get("/search", courseSearchController.courseSearch);

module.exports = router;
