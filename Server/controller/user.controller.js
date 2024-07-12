const db = require('../model/index');
const User = require('../model/user.model');

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

async function list(req, res, next) {
  try {
    const list = await User.find();
    const newList = list.map(r => ({
      _id: r._id,
      username: r.username,
      email: r.email,
      fullName: r.fullName,
      phoneNumber: r.phoneNumber,
      address: r.address
    }));
    res.status(200).json(newList);
  } catch (error) {
    next(error);
  }
}

async function deleteUserById(req, res, next) {
  try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.status(204).json({ message: " deleted successfully" });
  } catch (error) {
      next(error);
  }
}

const UserController = { 
  getCustomerById, viewProfile, editProfile, list, deleteUserById
 };
module.exports = UserController;
