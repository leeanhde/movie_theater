const db = require('../model/index');
const Promotion = require('../model/promotion.model');

async function createPromotion(req, res, next) {
    try {
        const newPromotion = new Promotion({
            title: req.body.title,
            detail: req.body.detail,
            discountLevel: req.body.discountLevel,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            image: req.body.image
        });
        const saved = await newPromotion.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
}

async function listPromotion(req, res, next) {
    try {
        const listPromotion = await Promotion.find();
        const newListPromotion = listPromotion.map(p => ({
            _id: p._id,
            title: p.title,
            detail: p.detail,
            discountLevel: p.discountLevel,
            startTime: new Date(p.startTime).toDateString('en-GB'),
            endTime: new Date(p.endTime).toDateString('en-GB'),
            image: p.image,
            deleted: p.deleted
        }));
        res.status(200).json(newListPromotion);
    } catch (error) {
        next(error);
    }
}


async function updatePromotion(req, res, next) {
    try {
        const promotionId = req.params.id;
        const updateData = {
            title: req.body.title,
            detail: req.body.detail,
            discountLevel: req.body.discountLevel,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            image: req.body.image,
            deleted: req.body.deleted
        } 
        await Promotion.findByIdAndUpdate(promotionId, updateData, { new: true });
        if (!promotionId) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.status(200).json({ message: 'Promotion update successfully' , updateData});
    } catch (error) {
        next(error);
    }
}

async function deletePromotion(req, res, next) {
    try {
        const promotionId = req.params.id;
        await Promotion.findByIdAndDelete(promotionId);
        if (!promotionId) {
            return res.status(404).json({ message: 'Promotion not found' });
        }
        res.status(200).json({ message: 'Promotion deleted successfully' });
    } catch (error) {
        next(error);
    }
}

const PromotionController = {
    createPromotion,
    listPromotion,
    updatePromotion,
    deletePromotion
};

module.exports = PromotionController;
