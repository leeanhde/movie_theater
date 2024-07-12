const db = require('../model/index');
const Schedule = db.schedule;

async function createSchedule(req, res, next) {
    try {
        const { movieId, cinemaRoomId, scheduleTime } = req.body;
        // Kiểm tra nếu các thông tin cần thiết không được cung cấp
        if (!movieId || !cinemaRoomId || !scheduleTime) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Tạo lịch chiếu mới
        const newSchedule = new Schedule({
            movieId,
            cinemaRoomId,
            scheduleTime
        });
        // Lưu vào database
        await newSchedule.save();

        res.status(201).json(newSchedule);
    } catch (error) {
        next(error);
    }
}

async function listSchedule(req, res, next) {
    try {
        const schedules = await Schedule.find({ deleted: false })
            .populate('movieId')
            .populate('cinemaRoomId');

        res.status(200).json(schedules);
    } catch (error) {
        next(error);
    }
}


async function updateSchedule(req, res, next) {
    try {
        const { id } = req.params;
        const { movieId, cinemaRoomId, scheduleTime } = req.body;

        // Kiểm tra nếu lịch chiếu không tồn tại
        const schedule = await Schedule.findById(id);
        if (!schedule || schedule.deleted) {
            return res.status(404).json({ message: "Schedule not found" });
        }

        // Cập nhật thông tin lịch chiếu
        schedule.movieId = movieId || schedule.movieId;
        schedule.cinemaRoomId = cinemaRoomId || schedule.cinemaRoomId;
        schedule.scheduleTime = scheduleTime || schedule.scheduleTime;

        // Lưu lại thông tin đã cập nhật
        await schedule.save();

        res.status(200).json(schedule);
    } catch (error) {
        next(error);
    }
}



async function deleteSchedule(req, res, next) {
    try {
        const { id } = req.params;
        // Xóa lịch chiếu theo ID
        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
        next(error);
    }
}


const ScheduleController = {
    createSchedule, listSchedule, updateSchedule, deleteSchedule
}
module.exports = ScheduleController;