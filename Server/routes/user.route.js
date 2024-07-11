const express = require('express');
const bodyParser = require('body-parser');

const UserRouter = express.Router();
UserRouter.use(bodyParser.json());

UserRouter.get('/getAll', UserController.listTypes);
UserRouter.post('/createType', TypeController.createType);
UserRouter.get('/listtype', TypeController.listTypes);
// TypeRouter.put('/updatetype', TypeController.editType);
// TypeRouter.delete('/deletetype', TypeController.deleteType);

module.exports = TypeRouter;
