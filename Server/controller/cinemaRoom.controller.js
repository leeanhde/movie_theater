const db = require('../model/index');
const CinemaRoom = db.CinemaRoom;


const create = async (req, res, next) => {
    try {
        const { cinemaRoomName, seatConfig } = req.body;
        const seats = [];

        // seatConfig should be an object with keys as seat rows and values as seat quantities
        for (const [seatColumn, seatQuantity] of Object.entries(seatConfig)) {
            for (let seatRow = 1; seatRow <= seatQuantity; seatRow++) {
                seats.push({
                    seatRow: seatRow,
                    seatColumn: seatColumn,
                    seatStatus: 0, // default status
                    seatType: 1,   // default type
                });
            }
        }

        const newCinemaRoom = new CinemaRoom({
            cinemaRoomName: cinemaRoomName,
            seatQuantity: seats.length,
            seats: seats,
        });

        const saved = await newCinemaRoom.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error);
    }
};

// update Cinema Room 
async function update(req, res, next) {
    try {
        const cinemaRoomId = req.params.id;
        const updatedData = {

        };
        const updated = await CinemaRoom.findByIdAndUpdate(cinemaRoomId, updatedData, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}
//update seat status dung de dat ghe
async function updateSeatStatus (req, res, next) {
    try {
        const cinemaRoomId = req.params.cinemaRoomId; // ID of the cinema room
        const seatIds = req.body.seatIds; // Array of seat IDs to update
        const newSeatStatus = req.body.seatStatus; // New status for the seats

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

async function listSeatInRoomById(req, res, next){
    try {
        const cinemaRoomId = req.params.cinemaRoomId;
        const cinemaRoom = await CinemaRoom.findById(cinemaRoomId);
        if (!cinemaRoom) {
            return res.status(404).json({ message: 'Cinema room not found' });
        }

        // Extract seats from the cinemaRoom object
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
};



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
        res.status(204).json({ message: " deleted successfully" });
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