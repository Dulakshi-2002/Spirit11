import express from "express";
import { processQuery } from "../controllers/chatbotController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

// Protected route
router.use(protect);

router.post("/query", processQuery);

export default router;
