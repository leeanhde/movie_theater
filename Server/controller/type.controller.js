const db = require('../model/index');
const Type = db.Type;

async function createType(req, res, next) {
    try {
        const newType = new Type({
            typeName: req.body.typeName
        });
        const saved = await newType.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
}

async function editType(req, res, next) {
    try {
        const { id, typeName } = req.body;
        const updatedType = await Type.findByIdAndUpdate(id, { typeName }, { new: true });
        res.status(200).json(updatedType);
    } catch (error) {
        next(error);
    }
}

async function listTypes(req, res, next) {
    try {
        const types = await Type.find({ deleted: false });
        res.status(200).json(types);
    } catch (error) {
        next(error);
    }
}

async function deleteType(req, res, next) {
    try {
        const { id } = req.body;
        const deletedType = await Type.findByIdAndUpdate(id, { deleted: true }, { new: true });
        res.status(200).json(deletedType);
    } catch (error) {
        next(error);
    }
}

const TypeController = {
    createType,
    editType,
    listTypes,
    deleteType
};

module.exports = TypeController;
