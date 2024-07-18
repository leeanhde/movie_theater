const express = require("express");
const bodyParser = require("body-parser");
const FeedbackController = require("../controller/feedback.controller");
const JWT = require("../middlewares/auth.jwt");
const FeedbackRouter = express.Router();

FeedbackRouter.use(bodyParser.json());

FeedbackRouter.post("/create", JWT.verifyToken, FeedbackController.createFeedback);

FeedbackRouter.get("/getAll", FeedbackController.getAllFeedbacks);

FeedbackRouter.get("/getAllByMovie", FeedbackController.getAllMoviesWithFeedback);

FeedbackRouter.get("/get/user/:userId", FeedbackController.getUserFeedbacks);

FeedbackRouter.get("/get/movie/:movieId", FeedbackController.getMovieFeedbacks);

FeedbackRouter.put("/:feedbackId",  FeedbackController.updateFeedback);

FeedbackRouter.delete("/:feedbackId",  FeedbackController.deleteFeedback);

module.exports = FeedbackRouter;
