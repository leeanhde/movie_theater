const db = require('../model/index');
const CinemaRoom = require('../model/cinemaRoom.model');
const Seat = require('../model/seat.model');


const create = async (req, res, next) => {
    try {
        const { cinemaRoomName, seatConfig } = req.body;
        const seats = [];

        // Create seats
        for (const [seatColumn, seatQuantity] of Object.entries(seatConfig)) {
            for (let seatRow = 1; seatRow <= seatQuantity; seatRow++) {
                const newSeat = new Seat({
                    cinemaRoomId: null,
                    seatRow: seatRow,
                    seatColumn: seatColumn,
                    seatStatus: 0,
                    seatType: 1,
                });
                seats.push(newSeat);
            }
        }

        // Create cinema room
        const newCinemaRoom = new CinemaRoom({
            cinemaRoomName: cinemaRoomName,
            seatQuantity: seats.length,
            seats: [], // This will be populated with seat IDs after saving
        });

        // Save cinema room to get ID
        const savedCinemaRoom = await newCinemaRoom.save();

        // Assign cinemaRoomId to each seat and save them
        const seatIds = [];
        for (let seat of seats) {
            seat.cinemaRoomId = savedCinemaRoom._id;
            const savedSeat = await seat.save();
            seatIds.push(savedSeat._id);
        }

        // Update cinema room with seat IDs
        savedCinemaRoom.seats = seatIds;
        await savedCinemaRoom.save();

        res.status(201).json(savedCinemaRoom);
    } catch (error) {
        next(error);
    }
};


// update Cinema Room 
const update = async (req, res, next) => {
    try {
        const cinemaRoomId = req.params.id;
        const updatedData = {
            cinemaRoomName: req.body.cinemaRoomName,
        };

        const updatedCinemaRoom = await CinemaRoom.findByIdAndUpdate(cinemaRoomId, updatedData, { new: true });
        if (!updatedCinemaRoom) {
            return res.status(404).json({ message: 'Cinema room not found' });
        }

        res.status(200).json(updatedCinemaRoom);
    } catch (error) {
        next(error);
    }
};
//update seat status dung de dat ghe
async function updateSeatStatus(req, res, next) {
    try {
        const cinemaRoomId = req.params.cinemaRoomId;
        const seatIds = req.body.seatIds;
        const newSeatStatus = req.body.seatStatus;

        // Find the cinema room by ID
        const cinemaRoom = await CinemaRoom.findById(cinemaRoomId);
        if (!cinemaRoom) {
            return res.status(404).json({ message: 'Cinema room not found' });
        }

        // Update each seat's status
        seatIds.forEach(seatId => {
            const seat = cinemaRoom.seats.id(seatId);
            if (seat) {
                seat.seatStatus = newSeatStatus;
            }
        });

        // Save the updated cinema room
        await cinemaRoom.save();

        // Return success message
        res.status(200).json(cinemaRoom);
    } catch (error) {
        next(error);
    }
};

async function listSeatInRoomById(req, res, next) {
    try {
        const cinemaRoomId = req.params.cinemaRoomId;
        const cinemaRoom = await CinemaRoom.findById(cinemaRoomId).populate('seats');
        if (!cinemaRoom) {
            return res.status(404).json({ message: 'Cinema room not found' });
        }

        // Extract seats from the populated cinemaRoom object
        const seats = cinemaRoom.seats.map(seat => ({
            _id: seat._id,
            seatRow: seat.seatRow,
            seatColumn: seat.seatColumn,
            seatStatus: seat.seatStatus,
            seatType: seat.seatType
        }));

        // Return the list of seats in the room
        res.status(200).json(seats);
    } catch (error) {
        next(error);
    }
}




//list cinema room
async function list(req, res, next) {
    try {
        const list = await CinemaRoom.find();
        const newList = list.map(r => ({
            _id: r._id,
            cinemaRoomName: r.cinemaRoomName,
            seatQuantity: r.seatQuantity
        }));
        res.status(200).json(newList);
    } catch (error) {
        next(error);
    }
}

async function deleteCinemaRoom(req, res, next) {
    try {
        const cinemaRoomId = req.params.id;
        await CinemaRoom.findByIdAndDelete(cinemaRoomId);
        res.status(200).json({ message: " deleted successfully" });
    } catch (error) {
        next(error);
    }
}

const CinemaRoomController = {
    create,
    update,
    updateSeatStatus,
    list,
    deleteCinemaRoom,
    listSeatInRoomById
}

module.exports = CinemaRoomController;