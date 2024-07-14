const express = require('express');
const router = express.Router();
const CinemaRoomController = require('../controller/cinemaRoom.controller');

// Create new cinema room
router.post('/createCinemaRoom', CinemaRoomController.create);

// List all cinema rooms
router.get('/listCinemaRoom', CinemaRoomController.list);

// List all seats in a cinema room by ID
router.get('/:cinemaRoomId/listallseats', CinemaRoomController.listSeatInRoomById);

// Update cinema room
router.put('/update/:id', CinemaRoomController.update);

// Update seat status
router.put('/:cinemaRoomId/seats/status', CinemaRoomController.updateSeatStatus);

// Delete cinema room
router.delete('/delete/:id', CinemaRoomController.deleteCinemaRoom);

module.exports = router;
