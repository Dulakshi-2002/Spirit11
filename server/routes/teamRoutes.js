import express from "express";
import {
  createTeam,
  getUserTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
  getLeaderboard,
  getTeamById,
} from "../controllers/teamController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.get("/leaderboard", getLeaderboard);

// Protected routes
router.use(protect);

router.post("/", createTeam);
router.get("/my-team", getUserTeam);
router.post("/add-player", addPlayerToTeam);
router.delete("/remove-player/:playerId", removePlayerFromTeam);

// Admin routes
router.get("/:id", protect, restrictTo("admin"), getTeamById);

export default router;
