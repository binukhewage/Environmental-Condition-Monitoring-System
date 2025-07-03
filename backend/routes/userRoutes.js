const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");

router.post("/users", createUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);

module.exports = router;
