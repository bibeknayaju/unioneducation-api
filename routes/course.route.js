import express from "express";
const router = express();
import { verifyToken } from "../utils/verifyUser.js";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateStatus,
} from "../controllers/course.controller.js";

router.post("/create", verifyToken, createCourse);
router.get("/courses", getCourses);
router.delete("/course/:courseId/:userId", verifyToken, deleteCourse);
router.put("/updateStatus/:courseId/:userId", verifyToken, updateStatus);

export default router;
