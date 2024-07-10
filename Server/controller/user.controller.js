const { User } = require("../model/index");

const getCustomerById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await User.findById(customerId);

    if (!customer || customer.role !== 'User') {
      return res.status(404).json({ message: "Customer not found", data: null });
    }

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};

// View user profile
const viewProfile = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming the user's ID is available in the request
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
    await User.findByIdAndUpdate(
      req.user.id, 
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          fullName: req.body.fullName,
          dob: req.body.dob,
          gender: req.body.gender,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          image: req.body.image
        }
      },
      { new: true, runValidators: true }
    );

    const updatedUser = await User.findById(req.user.id);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCustomerById, viewProfile, editProfile };
