const { default: mongoose } = require("mongoose");
const db = require("../model");
const { user: User, role: Role, booking: Booking } = db;

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
const getUserByRole = async (req, res, next) => {
  try {
    const { roleName } = req.params;

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({ message: "Role not found", data: null });
    }

    const users = await User.find({ roles: role._id }).populate("roles");

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with this role", data: null });
    }

    res.status(200).json({ message: "Users found successfully", data: users });
  } catch (error) {
    console.error("Error in getUserByRole:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
    next(error);
  }
};
const getUserBookings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate("scheduleId");

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user", data: null });
    }

    res
      .status(200)
      .json({ message: "Bookings found successfully", data: bookings });
  } catch (error) {
    console.error("Error in getUserBookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
    next(error);
  }
};
const updateUserBookings = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const updatedData = req.body;

    // Tìm và cập nhật booking với bookingId
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updatedData,
      { new: true }
    ).populate("scheduleId");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found", data: null });
    }

    res
      .status(200)
      .json({ message: "Booking updated successfully", data: updatedBooking });
  } catch (error) {
    console.error("Error in updateUserBookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
    next(error);
  }
};
const getUserAllBookings = async (req, res, next) => {
  console.log("🚀 ~ getUserAllBookings ~ req:", req)
  try {
    const bookings = await Booking.find({}).populate("scheduleId");
    console.log("🚀 ~ getUserAllBookings ~ bookings:", bookings);

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user", data: null });
    }

    res
      .status(200)
      .json({ message: "Bookings found successfully", data: bookings });
  } catch (error) {
    console.error("Error in getUserBookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
    next(error);
  }
};
// View user profile
const viewProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Edit user profile
const editProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedData = {
      email: req.body.email,
      username: req.body.username,
      fullName: req.body.fullName,
      dob: req.body.dob,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      image: req.body.image,
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  getUserByRole,
  viewProfile,
  editProfile,
  getUserBookings,
  getUserAllBookings,
  updateUserBookings,
};
