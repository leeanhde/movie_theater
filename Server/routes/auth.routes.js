const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('../controller/auth.controller');
const VerifySignUp = require('../middlewares/verifiSignUp')


const authRouter = express.Router();
authRouter.use(bodyParser.json());

authRouter.post('/signup', VerifySignUp.checkExistUser, AuthController.register);

module.exports = authRouter;
 