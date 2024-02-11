import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
const router = express();
import {
  createInstructor,
  deleteInstructor,
  getInstructors,
} from "../controllers/instructor.controller.js";

router.post("/createInstructor", verifyToken, createInstructor);
router.get("/getInstructors", getInstructors);
router.delete(
  "/deleteInstructor/:instructorId/:userId",
  verifyToken,
  deleteInstructor
);

export default router;
