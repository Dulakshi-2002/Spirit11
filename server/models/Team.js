import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    players: [
      {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
          required: true,
        },
      },
    ],
    totalPoints: {
      type: Number,
      default: 0,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    totalValue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Check if team has 11 players and calculate total points
TeamSchema.pre("save", async function (next) {
  if (this.players.length === 11) {
    this.isComplete = true;
  } else {
    this.isComplete = false;
  }

  // Recalculate total points and value only if players array is modified
  if (this.isModified("players")) {
    // Populate players to get their points
    const populatedTeam = await mongoose
      .model("Team")
      .findOne({ _id: this._id })
      .populate("players.player");

    if (populatedTeam) {
      this.totalPoints = populatedTeam.players.reduce(
        (sum, p) => sum + (p.player?.points || 0),
        0
      );
      this.totalValue = populatedTeam.players.reduce(
        (sum, p) => sum + (p.player?.value || 0),
        0
      );
    }
  }

  next();
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;
