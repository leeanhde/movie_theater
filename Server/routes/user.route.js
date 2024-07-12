const express = require('express');
const bodyParser = require("body-parser");
const userController = require('../controller/user.controller');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/get/:userId',userController.getUserById);

userRouter.get('/by-booking/user/:userId',userController.getUserBookings);

userRouter.get('/by-booking/getAll',userController.getUserAllBookings);

userRouter.put('/by-booking/booking/:bookingId',userController.updateUserBookings);

userRouter.get('/by-role/:roleName',userController.getUserByRole);

userRouter.put('/new',userController.addNewUser);

// Định nghĩa các route và liên kết với các phương thức trong controller
userRouter.get('/profile/:id', userController.viewProfile);
userRouter.put('/profile/update/:id', userController.editProfile);

module.exports = userRouter;
