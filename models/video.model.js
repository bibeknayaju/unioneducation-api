import mongoose from "mongoose";
const VideoSchema = mongoose.Schema(
  {
    url: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
const Videos = mongoose.model("Video", VideoSchema);
export default Videos;
