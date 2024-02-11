import Instructor from "../models/instructor.model.js";

import { errorHandler } from "../utils/error.js";

export const createInstructor = async (req, res, next) => {
  try {
    const { image, name, email, phoneNumber, address, gender, subject } =
      req.body;
    const newInstructor = new Instructor({
      profilePicture: image,
      name,
      email,
      phoneNumber,
      address,
      gender,
      subject,
    });
    try {
      const savedInstructor = await newInstructor.save();
      res.status(201).json(savedInstructor);
    } catch (error) {
      next(errorHandler(error));
    }
  } catch (error) {
    next(errorHandler(error));
  }
};

export const getInstructors = async (req, res, next) => {
  try {
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const instructors = await Instructor.find({
      ...(req.query.instructorId && { _id: req.query.instructorId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { subject: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    }).sort({ updatedAt: sortDirection });
    const totalInstructors = await Instructor.countDocuments();
    res.status(200).json({
      instructors,
      totalInstructors,
    });
  } catch (error) {
    next(errorHandler(error.message));
  }
};

export const deleteInstructor = async (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).json("You are not allowed to delete an instructor");
  try {
    await Instructor.findByIdAndDelete(req.params.instructorId);
    res.status(200).json("Instructor has been deleted");
  } catch (error) {
    next(errorHandler(error.message));
  }
};
