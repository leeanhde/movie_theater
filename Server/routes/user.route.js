const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Định nghĩa các route và liên kết với các phương thức trong controller
router.get('/profile/:id', userController.viewProfile);
router.put('/profile/edit/:id', userController.editProfile);

module.exports = router;
