import Testimonal from "../models/testimonal.modal.js";

import { errorHandler } from "../utils/error.js";

export const createTestimonial = async (req, res, next) => {
  try {
    const { testimonal, name, image } = req.body;
    console.log(testimonal, name, image);
    const newTestimonial = new Testimonal({
      testimonal,
      name,
      image,
    });
    try {
      const savedTestimonial = await newTestimonial.save();
      res.status(201).json(savedTestimonial);
    } catch (error) {
      next(errorHandler(error));
    }
  } catch (error) {
    next(errorHandler(error));
  }
};

export const getTestimonals = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 15;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const testimonal = await Testimonal.find({
      // ...(req.query.userId && { userId: req.query.userId }),
      // ...(req.query.testimonalId && { _id: req.query.testimonalId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json({
      testimonal,
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

export const deleteTestimonial = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Testimonal.findByIdAndDelete(req.params.testimonialId);
    res.status(200).json("The testimonial has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    const testimonial = await Testimonal.findById(req.params.testimonialId);
    if (testimonial) {
      testimonial.status = !testimonial.status;
      await testimonial.save();
      return res.status(200).json("The status has been updated!");
    }
  } catch (error) {
    next(error);
  }
};
