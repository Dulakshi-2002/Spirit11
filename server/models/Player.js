import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Player name is required"],
      trim: true,
    },
    university: {
      type: String,
      required: [true, "University name is required"],
    },
    // Batting stats
    totalRuns: {
      type: Number,
      default: 0,
    },
    ballsFaced: {
      type: Number,
      default: 0,
    },
    inningsBatted: {
      type: Number,
      default: 0,
    },
    // Bowling stats
    wicketsTaken: {
      type: Number,
      default: 0,
    },
    ballsBowled: {
      type: Number,
      default: 0,
    },
    runsConceded: {
      type: Number,
      default: 0,
    },
    // Calculated fields
    battingStrikeRate: {
      type: Number,
      default: 0,
    },
    battingAverage: {
      type: Number,
      default: 0,
    },
    bowlingStrikeRate: {
      type: Number,
      default: 0,
    },
    economyRate: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate and update player stats before saving
PlayerSchema.pre("save", function (next) {
  // Calculate Batting Strike Rate
  if (this.ballsFaced > 0) {
    this.battingStrikeRate = (this.totalRuns / this.ballsFaced) * 100;
  }

  // Calculate Batting Average
  if (this.inningsBatted > 0) {
    this.battingAverage = this.totalRuns / this.inningsBatted;
  }

  // Calculate Bowling Strike Rate
  if (this.wicketsTaken > 0) {
    this.bowlingStrikeRate = this.ballsBowled / this.wicketsTaken;
  }

  // Calculate Economy Rate
  if (this.ballsBowled > 0) {
    this.economyRate = (this.runsConceded / this.ballsBowled) * 6;
  }

  // Calculate Player Points based on the formula
  this.points =
    this.battingStrikeRate * this.battingAverage * 0.5 +
    500 / (this.bowlingStrikeRate + this.economyRate);

  // Calculate Player Value (round to nearest multiple of 50,000)
  this.value = Math.round(((9 * this.points + 100) * 1000) / 50000) * 50000;

  next();
});

const Player = mongoose.model("Player", PlayerSchema);
export default Player;
