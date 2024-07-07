const express = require('express');
const router = express.Router();
const PromotionController = require('../controller/promotion.controller');

// Định nghĩa các route và liên kết với các phương thức trong controller
router.post('/createPromotion', PromotionController.createPromotion);
router.get('/listPromotion', PromotionController.listPromotion);
router.put('/promotions/:id', PromotionController.updatePromotion);
router.delete('/promotions/:id', PromotionController.deletePromotion);

module.exports = router;
