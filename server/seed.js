import mongoose from "mongoose";
import dotenv from "dotenv";
import Player from "./models/Player.js";
import User from "./models/User.js";
import Team from "./models/Team.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    seedDB();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Seed database with sample data
const seedDB = async () => {
  try {
    // Clear existing data
    await Player.deleteMany({});
    await User.deleteMany({});
    await Team.deleteMany({});

    console.log("Cleared existing data");

    // Create test admin user
    const adminUser = await User.create({
      username: "admin",
      email: "admin@spirt11.com",
      password: "admin123",
      role: "admin",
      university: "Admin University",
      budget: 5000000,
    });

    console.log("Created admin user");

    // Create test user
    const testUser = await User.create({
      username: "spirt11_2025",
      email: "spirt11@example.com",
      password: "Spirt11@2025",
      university: "Test University",
      budget: 5000000,
    });

    console.log("Created test user");

    // Create sample players
    const samplePlayers = [
      // Sample data based on the project requirement
      {
        name: "Danushka Kumara",
        university: "University A",
        totalRuns: 320,
        ballsFaced: 240,
        inningsBatted: 8,
        wicketsTaken: 5,
        ballsBowled: 120,
        runsConceded: 180,
      },
      {
        name: "Jeewan Thirimanne",
        university: "University B",
        totalRuns: 280,
        ballsFaced: 220,
        inningsBatted: 7,
        wicketsTaken: 2,
        ballsBowled: 60,
        runsConceded: 90,
      },
      {
        name: "Charith Shanaka",
        university: "University C",
        totalRuns: 150,
        ballsFaced: 130,
        inningsBatted: 6,
        wicketsTaken: 12,
        ballsBowled: 180,
        runsConceded: 210,
      },
      {
        name: "Pathum Dhananjaya",
        university: "University A",
        totalRuns: 210,
        ballsFaced: 180,
        inningsBatted: 7,
        wicketsTaken: 8,
        ballsBowled: 150,
        runsConceded: 170,
      },
      {
        name: "Suranga Bandara",
        university: "University D",
        totalRuns: 80,
        ballsFaced: 70,
        inningsBatted: 5,
        wicketsTaken: 18,
        ballsBowled: 220,
        runsConceded: 250,
      },
      {
        name: "Sammu Sandakan",
        university: "University B",
        totalRuns: 60,
        ballsFaced: 50,
        inningsBatted: 4,
        wicketsTaken: 15,
        ballsBowled: 200,
        runsConceded: 230,
      },
      {
        name: "Minod Rathiyake",
        university: "University C",
        totalRuns: 175,
        ballsFaced: 150,
        inningsBatted: 6,
        wicketsTaken: 7,
        ballsBowled: 120,
        runsConceded: 140,
      },
      {
        name: "Lakshan Gunatilake",
        university: "University D",
        totalRuns: 195,
        ballsFaced: 160,
        inningsBatted: 7,
        wicketsTaken: 6,
        ballsBowled: 110,
        runsConceded: 130,
      },
      {
        name: "Sadeera Rajapaksa",
        university: "University A",
        totalRuns: 230,
        ballsFaced: 190,
        inningsBatted: 8,
        wicketsTaken: 3,
        ballsBowled: 80,
        runsConceded: 100,
      },
      {
        name: "Danushka Jayasekrama",
        university: "University B",
        totalRuns: 250,
        ballsFaced: 200,
        inningsBatted: 7,
        wicketsTaken: 4,
        ballsBowled: 90,
        runsConceded: 110,
      },
      {
        name: "Lakshan Vandasay",
        university: "University C",
        totalRuns: 190,
        ballsFaced: 170,
        inningsBatted: 6,
        wicketsTaken: 10,
        ballsBowled: 160,
        runsConceded: 180,
      },
    ];

    const createdPlayers = await Player.create(samplePlayers);
    console.log(`Created ${createdPlayers.length} players`);

    // Create a test team
    const selectedPlayers = createdPlayers.slice(0, 11).map((player) => ({
      player: player._id,
    }));

    const team = await Team.create({
      name: "Test Team",
      owner: testUser._id,
      players: selectedPlayers,
    });

    console.log("Created test team");

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};
