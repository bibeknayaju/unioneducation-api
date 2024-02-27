import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

export const createCourse = async (req, res, next) => {
  try {
    const { title, instructor, price, image, description, howToStart } =
      req.body;
    const newTitle = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-\u0900-\u097F]/g, "");
    const newPost = new Course({
      title,
      instructor,
      price,
      image,
      description,
      slug: newTitle,
      howToStart,
      // userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(errorHandler(error));
    }
  } catch (error) {
    next(errorHandler(error));
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 15;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const courses = await Course.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.courseId && { _id: req.query.courseId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalCourses = await Course.countDocuments();
    res.status(200).json({
      courses,
      totalCourses,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler("You are not allowed to delete a course", 403));
  }
  try {
    await Course.findByIdAndDelete(req.params.courseId);
    res.status(200).json("Course has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler("You are not allowed to update the status", 403));
  }
  try {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      course.status = !course.status;
      await course.save();
      return res.status(200).json("The status has been updated!");
    }
  } catch (error) {
    next(error);
  }
};
