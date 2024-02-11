import mongoose from "mongoose";

const testimonalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    testimonal: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

const Testimonal = mongoose.model("Testimonal", testimonalSchema);

export default Testimonal;
