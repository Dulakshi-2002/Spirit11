import Player from "../models/Player.js";
import Team from "../models/Team.js";
import User from "../models/User.js";

// Get tournament summary
export const getTournamentSummary = async (req, res, next) => {
  try {
    // Get total users and teams
    const userCount = await User.countDocuments();
    const teamCount = await Team.countDocuments();
    const completeTeamCount = await Team.countDocuments({ isComplete: true });

    // Get player stats
    const playerStats = await Player.aggregate([
      {
        $group: {
          _id: null,
          totalRuns: { $sum: "$totalRuns" },
          totalWickets: { $sum: "$wicketsTaken" },
          highestRunScorer: {
            $max: { runs: "$totalRuns", player: "$_id", name: "$name" },
          },
          highestWicketTaker: {
            $max: { wickets: "$wicketsTaken", player: "$_id", name: "$name" },
          },
        },
      },
    ]);

    // Get top 5 valued players
    const topValuedPlayers = await Player.find().sort({ value: -1 }).limit(5);

    // Get top 5 point scorers
    const topPointScorers = await Player.find().sort({ points: -1 }).limit(5);

    res.status(200).json({
      success: true,
      summary: {
        userCount,
        teamCount,
        completeTeamCount,
        playerStats: playerStats[0] || { totalRuns: 0, totalWickets: 0 },
        topValuedPlayers,
        topPointScorers,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all teams for admin
export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate("owner", "username university")
      .sort({ totalPoints: -1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users for admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Update player stats in bulk
export const updatePlayerStats = async (req, res, next) => {
  try {
    const { players } = req.body;

    if (!Array.isArray(players)) {
      return res.status(400).json({
        success: false,
        message: "Players must be an array",
      });
    }

    const updatePromises = players.map(async (playerData) => {
      return Player.findByIdAndUpdate(playerData._id, playerData, {
        new: true,
        runValidators: true,
      });
    });

    const updatedPlayers = await Promise.all(updatePromises);

    res.status(200).json({
      success: true,
      count: updatedPlayers.length,
      players: updatedPlayers,
    });
  } catch (error) {
    next(error);
  }
};
