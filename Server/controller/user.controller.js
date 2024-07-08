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

module.exports = { getCustomer };
