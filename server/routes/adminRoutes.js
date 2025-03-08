import express from "express";
import {
  getTournamentSummary,
  getAllTeams,
  getAllUsers,
  updatePlayerStats,
} from "../controllers/adminController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// All admin routes are protected
router.use(protect);
router.use(restrictTo("admin"));

router.get("/tournament-summary", getTournamentSummary);
router.get("/teams", getAllTeams);
router.get("/users", getAllUsers);
router.patch("/update-player-stats", updatePlayerStats);

export default router;
