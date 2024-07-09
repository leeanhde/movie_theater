const express = require('express');
const router = express.Router();
const CinemaRoomController = require('../controller/cinemaRoom.controller');

// Định nghĩa các route và liên kết với các phương thức trong controller

// tao moi phong chhieu moi
router.post('/createCinemaRoom', CinemaRoomController.create);
// list tat cac phong chieu
router.get('/listCinemaRoom', CinemaRoomController.list);
// list all seat in 1 room check theo id
router.get('/:cinemaRoomId/seats', CinemaRoomController.listSeatInRoomById);
//update cinemaroom
router.put('/:id', CinemaRoomController.update);
//update status of [] seat chuyen doi cac trang thai nhu trong, da dat, bao tri 
router.put('/:cinemaRoomId/seats/status', CinemaRoomController.updateSeatStatus)
//xoa room
router.delete('/:id', CinemaRoomController.deleteCinemaRoom);

module.exports = router;
