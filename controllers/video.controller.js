import Video from "../models/video.model.js";
import { errorHandler } from "../utils/error.js";

export const createVideo = async (req, res, next) => {
  try {
    const { url, description } = req.body;
    const newVideo = new Video({
      url,
      description,
    });
    try {
      const savedVideo = await newVideo.save();
      res.status(201).json(savedVideo);
    } catch (error) {
      next(errorHandler(error));
    }
  } catch (error) {
    next(errorHandler(error.message));
  }
};

export const getVideos = async (req, res, next) => {
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const videos = await Video.find({
    ...(req.query.videoId && { _id: req.query.videoId }),
    ...(req.query.searchTerm && {
      $or: [
        { url: { $regex: req.query.searchTerm, $options: "i" } },
        { description: { $regex: req.query.searchTerm, $options: "i" } },
      ],
    }),
  }).sort({ updatedAt: sortDirection });
  const totalVideos = await Video.countDocuments();
  res.status(200).json({
    videos,
    totalVideos,
  });
};

export const deleteVideo = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Video.findByIdAndDelete(req.params.videoId);
    res.status(200).json("The video has been deleted!");
  } catch (error) {
    next(errorHandler(error));
  }
};
