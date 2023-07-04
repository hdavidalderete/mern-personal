const Course = require("../models/course");
const { getFileName } = require("../utils/image");

const getCourses = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const optionPagination = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  Course.paginate({}, optionPagination, (error, course) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send({ course });
    }
  });
};

const createCourse = async (req, res) => {
  const courseData = req.body;
  const { miniature } = req.files;
  const newCourse = new Course({
    ...courseData,
    miniature: getFileName(miniature),
  });
  const course = await newCourse.save();
  res.status(201).send({ course });
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const courseData = req.body;
  const miniature = req.files?.miniature;

  if (miniature) {
    courseData.miniature = getFileName(miniature);
  }
  try {
    const course = await Course.findByIdAndUpdate(id, { ...courseData });
    res.status(200).send({ course });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  await Course.findByIdAndDelete(id);

  res.status(200).send({ msg: "El course se elimino con exito" });
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
