const express = require('express');
const bodyParser = require('body-parser');
const TypeController = require('../controller/type.controller');

const TypeRouter = express.Router();
TypeRouter.use(bodyParser.json());

TypeRouter.post('/createType', TypeController.createType);
TypeRouter.get('/listtype', TypeController.listTypes);
TypeRouter.put('/updatetype/:id', TypeController.editType);
TypeRouter.delete('/deletetype/:id', TypeController.deleteType);

module.exports = TypeRouter;
