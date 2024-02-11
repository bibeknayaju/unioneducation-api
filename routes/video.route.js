import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createVideo,
  deleteVideo,
  getVideos,
} from "../controllers/video.controller.js";
const router = express();

router.post("/createVideo", verifyToken, createVideo);
router.get("/getVideos", getVideos);
router.delete("/deleteVideo/:videoId/:userId", verifyToken, deleteVideo);

export default router;
