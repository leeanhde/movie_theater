const db = require("../model/index");
const User = db.user
const Movie = db.movie
const Feedback = db.feedback
const createFeedback = async (req, res, next) => {
  try {
    const { rating, comment, movieId } = req.body;
    const userId = req.user._id;
    console.log("🚀 ~ createFeedback ~ userId:", userId)

    if (!comment || !rating || !movieId) {
      return res.status(400).json({ message: "Data is required", data: null });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found", data: null });
    }

    const user = await User.findById(userId).populate('feedbacks');
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const existingFeedback = user.feedbacks.find(feedback => feedback.movieId.toString() === movieId);
    if (existingFeedback) {
      return res.status(400).json({ message: "You have already provided feedback for this movie", data: null });
    }

    const feedback = new Feedback({ userId, movieId, rating, comment });
    await feedback.save();

    user.feedbacks.push(feedback._id);
    await user.save();

    res.status(201).json({ message: "Feedback created successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const getAllFeedbacks = async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate({
        path: 'feedbacks',
        populate: {
          path: 'movieId',
          model: 'movie'
        }
      })
      .exec();

    const feedbacks = users.reduce((acc, user) => {
      user.feedbacks.forEach(feedback => {
        const feedbackObject = feedback.toObject();
        delete feedbackObject.movieId; 
    
        acc.push({
          ...feedbackObject,
          username: user.username,
          movie: feedback.movieId  
        });
      });
      return acc;
    }, []);
    
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error in getAllFeedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
const getUserFeedbacks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate({
      path: 'feedbacks',
      populate: { path: 'movieId',model : 'movie' } 
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const feedbacks = user.feedbacks.map(feedback => {
      const feedbackObj = feedback.toObject();
      delete feedbackObj.movieId; 
      return { ...feedbackObj, movie: feedback.movieId };
    });

    res.status(200).json({ feedbacks });
  } catch (error) {
    next(error);
  }
};

const updateFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const { rating, comment } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { rating, comment },
      { new: true } 
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found", data: null });
    }

    res.status(200).json({ message: "Feedback updated successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found", data: null });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createFeedback , getAllFeedbacks, getUserFeedbacks, updateFeedback, deleteFeedback };
