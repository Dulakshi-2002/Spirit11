import Team from "../models/Team.js";
import User from "../models/User.js";
import Player from "../models/Player.js";
import { io } from "../server.js";

// Create team
export const createTeam = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Check if team already exists for this user
    const existingTeam = await Team.findOne({ owner: req.user.id });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "You already have a team. Please update it instead.",
      });
    }

    // Create team
    const team = await Team.create({
      name,
      owner: req.user.id,
      players: [],
      totalPoints: 0,
    });

    res.status(201).json({
      success: true,
      team,
    });
  } catch (error) {
    next(error);
  }
};

// Get user team
export const getUserTeam = async (req, res, next) => {
  try {
    const team = await Team.findOne({ owner: req.user.id })
      .populate("players.player")
      .populate("owner", "username university");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    next(error);
  }
};

// Add player to team
export const addPlayerToTeam = async (req, res, next) => {
  try {
    const { playerId } = req.body;

    // Get user team
    const team = await Team.findOne({ owner: req.user.id }).populate(
      "players.player"
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found. Please create a team first.",
      });
    }

    // Check if team already has 11 players
    if (team.players.length >= 11) {
      return res.status(400).json({
        success: false,
        message: "Team already has maximum number of players (11)",
      });
    }

    // Check if player is already in the team
    const isPlayerInTeam = team.players.some(
      (p) => p.player._id.toString() === playerId
    );

    if (isPlayerInTeam) {
      return res.status(400).json({
        success: false,
        message: "Player is already in your team",
      });
    }

    // Get player
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    // Check if user has enough budget
    const user = await User.findById(req.user.id);

    if (user.budget < player.value) {
      return res.status(400).json({
        success: false,
        message: "Insufficient budget to add this player",
      });
    }

    // Add player to team
    team.players.push({ player: playerId });

    // Update user budget
    user.budget -= player.value;
    await user.save();

    // Save team
    await team.save();

    // Get updated team with populated players
    const updatedTeam = await Team.findById(team._id)
      .populate("players.player")
      .populate("owner", "username university");

    // Emit real-time update
    io.to(`user-${req.user.id}`).emit("teamUpdated", updatedTeam);

    res.status(200).json({
      success: true,
      team: updatedTeam,
      remainingBudget: user.budget,
    });
  } catch (error) {
    next(error);
  }
};

// Remove player from team
export const removePlayerFromTeam = async (req, res, next) => {
  try {
    const { playerId } = req.params;

    // Get user team
    const team = await Team.findOne({ owner: req.user.id }).populate(
      "players.player"
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    // Check if player is in the team
    const playerIndex = team.players.findIndex(
      (p) => p.player._id.toString() === playerId
    );

    if (playerIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Player is not in your team",
      });
    }

    // Get player value to refund
    const playerValue = team.players[playerIndex].player.value;

    // Remove player from team
    team.players.splice(playerIndex, 1);

    // Update user budget
    const user = await User.findById(req.user.id);
    user.budget += playerValue;
    await user.save();

    // Save team
    await team.save();

    // Get updated team with populated players
    const updatedTeam = await Team.findById(team._id)
      .populate("players.player")
      .populate("owner", "username university");

    // Emit real-time update
    io.to(`user-${req.user.id}`).emit("teamUpdated", updatedTeam);

    res.status(200).json({
      success: true,
      team: updatedTeam,
      remainingBudget: user.budget,
    });
  } catch (error) {
    next(error);
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res, next) => {
  try {
    const teams = await Team.find({ isComplete: true })
      .sort({ totalPoints: -1 })
      .populate("owner", "username university")
      .limit(100);

    res.status(200).json({
      success: true,
      teams,
    });
  } catch (error) {
    next(error);
  }
};

// Get team details by ID (for admin)
export const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("players.player")
      .populate("owner", "username university");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      team,
    });
  } catch (error) {
    next(error);
  }
};
