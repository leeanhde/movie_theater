const db = require('../model/index');
const Seat = db.Seat;

const generateSeatsArray = (cinemaRoomId, seatConfig) => {
    const seats = [];

    // seatConfig should be an object with keys as seat columns and values as seat quantities
    for (const [seatColumn, seatQuantity] of Object.entries(seatConfig)) {
        for (let seatRow = 1; seatRow <= seatQuantity; seatRow++) {
            seats.push({
                cinemaRoomId,
                seatRow,
                seatColumn,
                seatStatus: 0, // default status
                seatType: 1,   // default type
            });
        }
    }

    return seats;
};

const create = async (req, res, next) => {
    try {
        const { cinemaRoomId, seatConfig } = req.body;
        const seatsArray = generateSeatsArray(cinemaRoomId, seatConfig);

        const savedSeats = await Seat.insertMany(seatsArray);

        res.status(201).json(savedSeats);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const seatId = req.params.id;
        const updatedData = req.body;

        const updated = await Seat.findByIdAndUpdate(seatId, updatedData, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Seat not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

const list = async (req, res, next) => {
    try {
        const { cinemaRoomId } = req.query;
        let filter = {};
        if (cinemaRoomId) {
            filter = { cinemaRoomId };
        }

        const seats = await Seat.find(filter);
        res.status(200).json(seats);
    } catch (error) {
        next(error);
    }
};

const deleteSeat = async (req, res, next) => {
    try {
        const seatId = req.params.id;
        const deleted = await Seat.findByIdAndDelete(seatId);

        if (!deleted) {
            return res.status(404).json({ message: "Seat not found" });
        }

        res.status(204).json({ message: "Deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const SeatController = {
    create,
    update,
    list,
    deleteSeat
};

module.exports = SeatController;
