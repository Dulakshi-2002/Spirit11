import natural from "natural";
import Player from "../models/Player.js";
import Team from "../models/Team.js";

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Process user query
export const processQuery = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    // Tokenize and stem the query
    const tokens = tokenizer.tokenize(query.toLowerCase());
    const stemmedTokens = tokens.map((token) => stemmer.stem(token));

    // Check if query is about player stats
    if (
      containsAny(stemmedTokens, [
        "stat",
        "statist",
        "averag",
        "run",
        "wicket",
        "perform",
      ])
    ) {
      // Check if query contains a player name
      const players = await Player.find();
      const playerNames = players.map((p) => p.name.toLowerCase());

      const matchedPlayer = findMatchingPlayer(
        tokens.join(" "),
        playerNames,
        players
      );

      if (matchedPlayer) {
        return res.status(200).json({
          success: true,
          type: "player_stats",
          message: generatePlayerStatsResponse(matchedPlayer),
        });
      }
    }

    // Check if query is about best team
    if (
      containsAny(stemmedTokens, [
        "best",
        "team",
        "suggest",
        "recommend",
        "top",
      ])
    ) {
      const bestTeam = await generateBestTeam();

      return res.status(200).json({
        success: true,
        type: "best_team",
        message: "Here is the best possible team with 11 players:",
        team: bestTeam,
      });
    }

    // Fallback response
    return res.status(200).json({
      success: true,
      type: "unknown",
      message:
        "I don't have enough knowledge to answer that question. You can ask me about player statistics or for team suggestions.",
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to check if array contains any of the words
function containsAny(array, words) {
  return words.some((word) => array.includes(word));
}

// Find matching player from query
function findMatchingPlayer(query, playerNames, players) {
  for (const name of playerNames) {
    if (query.includes(name)) {
      return players.find((p) => p.name.toLowerCase() === name);
    }
  }
  return null;
}

// Generate player stats response
function generatePlayerStatsResponse(player) {
  return `
    Here are the stats for ${player.name} from ${player.university}:
    
    Batting:
    - Total Runs: ${player.totalRuns}
    - Batting Average: ${player.battingAverage.toFixed(2)}
    - Batting Strike Rate: ${player.battingStrikeRate.toFixed(2)}
    
    Bowling:
    - Wickets Taken: ${player.wicketsTaken}
    - Bowling Strike Rate: ${player.bowlingStrikeRate.toFixed(2)}
    - Economy Rate: ${player.economyRate.toFixed(2)}
    
    Overall:
    - Points: ${player.points.toFixed(2)}
    - Value: Rs. ${player.value.toLocaleString()}
  `;
}

// Generate best team recommendation
async function generateBestTeam() {
  // Get top 11 players by points
  const topPlayers = await Player.find().sort({ points: -1 }).limit(11);

  return topPlayers;
}
