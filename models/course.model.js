import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://scontent.fpkr1-1.fna.fbcdn.net/v/t39.30808-6/407967561_377975164606460_6186283714176500683_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=783fdb&_nc_ohc=Ge0h7vWO6kIAX_Jikxb&_nc_ht=scontent.fpkr1-1.fna&oh=00_AfCqTnjOtbN3ac_9l-1HPsyIh1wwQS-t_4ddJ5VTrePeeA&oe=65C9F6EC",
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: true, required: false },
    catergory: { type: String, required: false },
    slug: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
