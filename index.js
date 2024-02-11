import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import courseRoutes from "./routes/course.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import userRoutes from "./routes/user.route.js";
import instructorRoutes from "./routes/instructor.route.js";
import videoRoutes from "./routes/video.route.js";
dotenv.config();
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("CONNECTE HAI TA");
  })
  .catch((error) => {
    console.log("ERROR in connection", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/video", videoRoutes);

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: "I'm live, Human!!" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
