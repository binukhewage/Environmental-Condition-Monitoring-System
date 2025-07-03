require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Authentication Routes (existing)
app.post("/users", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Return user data without password
        const { password, ...userData } = user.toObject();
        res.json({ status: "Success", user: userData });
      } else {
        res.json("Password Is Incorrect");
      }
    } else {
      res.json("No Record Existed");
    }
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findById(id)
    .then((user) => {
      if (user) {
        const { password, ...userData } = user.toObject();
        res.json(userData);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
