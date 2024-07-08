const { User, Movie } = require("../model/index");

const createFeedback = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (!comment || !rating || !movieId) {
      return res.status(400).json({ message: "Data is required", data: null });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found", data: null });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const feedback = { movieId, rating, comment };
    user.feedbacks.push(feedback);

    await user.save();

    res.status(201).json({ message: "Feedback created successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};
const getAllFeedbacks = async (req, res, next) => {
  try {
    const users = await User.find().populate('feedbacks.movieId');
    const feedbacks = users.reduce((acc, user) => {
      user.feedbacks.forEach(feedback => {
        acc.push({ ...feedback.toObject(), user: user.username });
      });
      return acc;
    }, []);
    
    res.status(200).json({ feedbacks });
  } catch (error) {
    next(error);
  }
};
const getUserFeedbacks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('feedbacks.movieId');
    
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.status(200).json({ feedbacks: user.feedbacks });
  } catch (error) {
    next(error);
  }
};

const updateFeedback = async (req, res, next) => {
  try {
    const { userId, feedbackId } = req.params;
    const { rating, comment } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const feedback = user.feedbacks.id(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found", data: null });
    }

    feedback.rating = rating ?? feedback.rating;
    feedback.comment = comment ?? feedback.comment;

    await user.save();

    res.status(200).json({ message: "Feedback updated successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const { userId, feedbackId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const feedback = user.feedbacks.id(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found", data: null });
    }

    feedback.remove();
    await user.save();

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createFeedback , getAllFeedbacks, getUserFeedbacks, updateFeedback, deleteFeedback };
