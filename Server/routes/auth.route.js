const express = require("express");
const bodyParser = require("body-parser");
const authController = require("../controller/auth.controller");
const VerifySignUp = require("../middlewares/verifySignUp");

const authRouter = express.Router();
authRouter.use(bodyParser.json());

// Register route
authRouter.post('/signup',[VerifySignUp.checkExistUser, VerifySignUp.checkExistRoles], authController.register);

// Login route
authRouter.post('/signin', authController.login);

// Logout route
authRouter.post('/logout', authController.logout);

// Refresh token route
authRouter.post('/refresh-token', authController.refreshToken);

// Forgot password route
authRouter.post('/forgot-password', authController.forgotPassword);

// Reset password route
authRouter.post('/reset-password', authController.resetPassword);

module.exports = authRouter;