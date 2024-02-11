import epxress from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createTestimonial,
  getTestimonals,
  deleteTestimonial,
  updateStatus,
} from "../controllers/testimonal.controller.js";
const router = epxress();

router.post("/create", verifyToken, createTestimonial);
router.get("/getTestimonals", getTestimonals);
router.delete("/delete/:testimonialId/:userId", verifyToken, deleteTestimonial);
router.put("/updateStatus/:testimonialId/:userId", verifyToken, updateStatus);

export default router;
