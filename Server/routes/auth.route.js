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

module.exports = authRouter;