const db = require('../model/index'); 
const Type = require('../model/type.model'); 

// Create a new type
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

// Edit an existing type
async function editType(req, res, next) {
    try {
        const typeId = req.params.id;
        const updatedData = {
            typeName: req.body.typeName
        };
        const updated = await Type.findByIdAndUpdate(typeId, updatedData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

// List all types
async function listTypes(req, res, next) {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        next(error);
    }
}

// Delete a type (soft delete)
async function deleteType(req, res, next) {
    try {
        const typeId = req.params.id;
        const deletedType = await Type.findByIdAndDelete(typeId);
        res.status(200).json({Message : 'deleted', deletedType});
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
