const express = require("express");
const bodyParser = require("body-parser");
const FeedbackController = require("../controller/feedback.controller");
const JWT = require("../middlewares/auth.jwt");
const FeedbackRouter = express.Router();

FeedbackRouter.use(bodyParser.json());

FeedbackRouter.post("/create", JWT.verifyToken, FeedbackController.createFeedback);

// FeedbackRouter.get("/getAll", JWT.verifyToken, JWT.isAdmin, FeedbackController.getAllFeedbacks);

// FeedbackRouter.get("/get/:userId", JWT.verifyToken, JWT.isAdmin, FeedbackController.getUserFeedbacks);

// FeedbackRouter.put("/:feedbackId", JWT.verifyToken, JWT.isAdmin, FeedbackController.updateFeedback);

// FeedbackRouter.delete("/:feedbackId", JWT.verifyToken, JWT.isAdmin, FeedbackController.deleteFeedback);

FeedbackRouter.get("/getAll", FeedbackController.getAllFeedbacks);

FeedbackRouter.get("/get/user/:userId", FeedbackController.getUserFeedbacks);

FeedbackRouter.put("/:feedbackId",  FeedbackController.updateFeedback);

FeedbackRouter.delete("/:feedbackId",  FeedbackController.deleteFeedback);

module.exports = FeedbackRouter;
