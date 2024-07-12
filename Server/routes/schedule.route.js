const express = require('express');
const bodyParser = require('body-parser');
const ScheduleController = require('../controller/schedule.controller');

const ScheduleRouter = express.Router();
ScheduleRouter.use(bodyParser.json());

ScheduleRouter.post('/create', ScheduleController.createSchedule);
ScheduleRouter.get('/list', ScheduleController.listSchedule);
ScheduleRouter.put('/update/:id', ScheduleController.updateSchedule);
ScheduleRouter.delete('/delete/:id', ScheduleController.deleteSchedule);

module.exports = ScheduleRouter;
