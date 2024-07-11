const db = require("../model/index");
const Food = db.Food;

async function createFood(req, res, next) {
    try {
        const newFood = new Food({
            foodTitle: req.body.foodTitle,
            foodDescription: req.body.foodDescription,
            foodPrice: req.body.foodPrice,
            foodQuantity: req.body.foodQuantity,
            foodImage: req.body.foodImage,
        });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        next(error);
    }
}

async function listFoods(req, res, next) {
    try {
        const listFoods = await Food.find().populate("promotionId types");
        if (!listFoods) {
            throw new Error('No foods found');
        }
        const newListFoods = listFoods.map(f => ({
            _id: f._id,
            foodTitle: f.foodTitle,
            foodDescription: f.foodDescription,
            foodPrice: f.foodPrice,
            foodQuantity: f.foodQuantity,
            foodImage: f.foodImage,
        }));
        res.status(200).json(newListFoods);
    } catch (error) {
        console.error('Error listing foods:', error);
        res.status(500).json({ status: 500, message: error.message });
    }
}


const FoodController = {
    createFood,
    listFoods,
}

module.exports = FoodController;
