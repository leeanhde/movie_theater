const db = require('../model');
const { user: User} = db;

const getUserById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await User.findById(customerId);

    if (!customer || customer.roles !== "User") {
      return res
        .status(404)
        .json({ message: "Customer not found", data: null });
    }

    res.status(200).json({ customer });
  } catch (error) {
    next(error);
  }
};
const getUserByRole = async (req, res, next) => {
  const { type } = req.params;  
};
const updateUserProfile = async (req, res, next) => {
  const { userId } = req.params;
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
          image: req.body.image
      };
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true});
      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      next(error);
  }
};


module.exports = { getUserById, viewProfile, editProfile };
