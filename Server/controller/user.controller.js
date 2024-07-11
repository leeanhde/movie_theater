const { User } = require("../model/index");

const getUserById = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const customer = await User.findById(customerId);

    if (!customer || customer.role !== "User") {
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

module.exports = { getUserById , getUserByRole ,updateUserProfile};
