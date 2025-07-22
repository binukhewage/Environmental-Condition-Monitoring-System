import express from "express";
import {
  createUser,
  loginUser,
  getUserById,
} from "../controllers/userController.js";

// ✅ Declare router BEFORE using it
const router = express.Router();

router.post("/users", createUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);

export default router;
