const EmployeeModel = require("../models/employee");

// Register new user
exports.createUser = async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        const { password, ...userData } = user.toObject();
        res.json({ status: "Success", user: userData });
      } else {
        res.status(401).json("Password Is Incorrect");
      }
    } else {
      res.status(404).json("No Record Existed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await EmployeeModel.findById(id);
    if (user) {
      const { password, ...userData } = user.toObject();
      res.json(userData);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
