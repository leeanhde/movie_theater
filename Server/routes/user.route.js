const express = require('express');
const bodyParser = require("body-parser");
const userController = require('../controller/user.controller');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

// Định nghĩa các route và liên kết với các phương thức trong controller
userRouter.get('/profile/:id', userController.viewProfile);
userRouter.put('/profile/update/:id', userController.editProfile);

module.exports = userRouter;
