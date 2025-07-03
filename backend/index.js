require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

const EmployeeModel = require("./models/employee");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
let conn = null;
async function connectToDB() {
  if (!conn) {
    conn = mongoose.connect(process.env.MONGODB_URI);
    await conn;
  }
}

// Default route
app.get("/", async (req, res) => {
  await connectToDB();
  res.send("API is working ✅");
});

// Routes
app.post("/users", async (req, res) => {
  await connectToDB();
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.status(500).json(err));
});

app.post("/login", async (req, res) => {
  await connectToDB();
  const { email, password } = req.body;
  EmployeeModel.findOne({ email }).then((user) => {
    if (!user) return res.json("No Record Existed");
    if (user.password !== password) return res.json("Password Is Incorrect");
    const { password, ...userData } = user.toObject();
    res.json({ status: "Success", user: userData });
  });
});

app.get("/user/:id", async (req, res) => {
  await connectToDB();
  const id = req.params.id;
  EmployeeModel.findById(id)
    .then((user) => {
      if (!user) return res.status(404).json("User not found");
      const { password, ...userData } = user.toObject();
      res.json(userData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = app;
module.exports.handler = serverless(app);
