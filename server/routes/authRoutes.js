import express from "express";
import {
  register,
  login,
  getCurrentUser,
  protect,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

export default router;
