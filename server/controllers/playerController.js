import Player from "../models/Player.js";
import { io } from "../server.js";

// Get all players
export const getAllPlayers = async (req, res, next) => {
  try {
    const players = await Player.find();

    res.status(200).json({
      success: true,
      count: players.length,
      players,
    });
  } catch (error) {
    next(error);
  }
};

// Get single player
export const getPlayer = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    res.status(200).json({
      success: true,
      player,
    });
  } catch (error) {
    next(error);
  }
};

// Create player (Admin only)
export const createPlayer = async (req, res, next) => {
  try {
    const newPlayer = await Player.create(req.body);

    // Emit real-time update
    io.to("adminRoom").emit("playerCreated", newPlayer);

    res.status(201).json({
      success: true,
      player: newPlayer,
    });
  } catch (error) {
    next(error);
  }
};

// Update player (Admin only)
export const updatePlayer = async (req, res, next) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    // Emit real-time update
    io.to("adminRoom").emit("playerUpdated", player);

    res.status(200).json({
      success: true,
      player,
    });
  } catch (error) {
    next(error);
  }
};

// Delete player (Admin only)
export const deletePlayer = async (req, res, next) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    // Emit real-time update
    io.to("adminRoom").emit("playerDeleted", req.params.id);

    res.status(200).json({
      success: true,
      message: "Player deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get player statistics
export const getPlayerStats = async (req, res, next) => {
  try {
    const stats = await Player.aggregate([
      {
        $group: {
          _id: null,
          totalRuns: { $sum: "$totalRuns" },
          totalWickets: { $sum: "$wicketsTaken" },
          highestRunScorer: { $max: { runs: "$totalRuns", name: "$name" } },
          highestWicketTaker: {
            $max: { wickets: "$wicketsTaken", name: "$name" },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0],
    });
  } catch (error) {
    next(error);
  }
};
