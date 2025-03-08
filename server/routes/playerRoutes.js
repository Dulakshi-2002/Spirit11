import express from "express";
import {
  getAllPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerStats,
} from "../controllers/playerController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/stats", getPlayerStats);
router.get("/:id", getPlayer);

// Protected admin routes
router.use(protect);
router.use(restrictTo("admin"));

router.post("/", createPlayer);
router.patch("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
