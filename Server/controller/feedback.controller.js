const db = require("../model/index");
const User = db.user;
const Movie = db.movie;
const Feedback = db.feedback;
const createFeedback = async (req, res, next) => {
  try {
    const { rating, comment, movieId } = req.body;
    const userId = req.user._id;
    console.log("🚀 ~ createFeedback ~ userId:", userId);

    if (!comment || !rating || !movieId) {
      return res.status(400).json({ message: "Data is required", data: null });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found", data: null });
    }

    const user = await User.findById(userId).populate("feedbacks");
    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const existingFeedback = user.feedbacks.find(
      (feedback) => feedback.movieId.toString() === movieId
    );
    if (existingFeedback) {
      return res
        .status(400)
        .json({
          message: "You have already provided feedback for this movie",
          data: null,
        });
    }

    const feedback = new Feedback({ userId, movieId, rating, comment });
    await feedback.save();

    user.feedbacks.push(feedback._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Feedback created successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const getAllFeedbacks = async (req, res, next) => {
  try {
    const users = await Feedback.find({})
      .populate({
        path: "movieId",
        model: "movie",
      })
      .populate({
        path: "userId",
        model: "user",
      });

    const feedbacks = users.map((feedback) => {
      const feedbackObj = feedback.toObject();
      delete feedbackObj.movieId;
      delete feedbackObj.userId;
      return { ...feedbackObj, movie: feedback.movieId, user: feedback.userId };
    });

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error in getAllFeedbacks:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
const getAllMoviesWithFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({}).distinct('movieId');

    if (feedbacks.length === 0) {
      return res.status(200).json({ movies: [] });
    }

    const movies = await Movie.find({ _id: { $in: feedbacks } }).lean();

    const feedbacksByMovie = await Feedback.find({ movieId: { $in: feedbacks } }).populate('userId', 'username');

    const moviesWithFeedback = movies.map(movie => {
      const movieFeedbacks = feedbacksByMovie.filter(feedback => feedback.movieId.equals(movie._id));

      const totalComments = movieFeedbacks.length;
      const averageRating = movieFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalComments;

      return {
        ...movie,
        feedbacks: movieFeedbacks,
        averageRating,
        totalComments,
      };
    });
    moviesWithFeedback.forEach(movie => {
      console.log(JSON.stringify(movie, null, 2));
    });
    res.status(200).json({ movies: moviesWithFeedback });
  } catch (error) {
    console.error("Error in getAllMoviesWithFeedback:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};
const getUserFeedbacks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate({
      path: "feedbacks",
      populate: { path: "movieId", model: "movie" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    const feedbacks = user.feedbacks.map((feedback) => {
      const feedbackObj = feedback.toObject();
      delete feedbackObj.movieId;
      return { ...feedbackObj, movie: feedback.movieId };
    });

    res.status(200).json({ feedbacks });
  } catch (error) {
    next(error);
  }
};
const getMovieFeedbacks = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Feedback.find({ movieId })
      .populate({
        path: "movieId",
        model: "movie",
      })
      .populate({
        path: "userId",
        model: "user",
      });
    console.log(movie);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found", data: null });
    }

    const feedbacks = movie.map((feedback) => {
      const feedbackObj = feedback.toObject();
      delete feedbackObj.movieId;
      delete feedbackObj.userId;
      return { ...feedbackObj, movie: feedback.movieId, user: feedback.userId };
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
      return res
        .status(404)
        .json({ message: "Feedback not found", data: null });
    }

    res
      .status(200)
      .json({ message: "Feedback updated successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      return res
        .status(404)
        .json({ message: "Feedback not found", data: null });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getUserFeedbacks,
  updateFeedback,
  deleteFeedback,
  getMovieFeedbacks,
  getAllMoviesWithFeedback
};
