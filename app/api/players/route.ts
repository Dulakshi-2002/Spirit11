import { NextResponse } from "next/server"
import type { Player } from "@/types"

// Mock player data
const players: Player[] = [
  {
    id: "1",
    name: "John Smith",
    university: "State University",
    cost: 1200,
    category: "offense",
    position: "Quarterback",
    stats: {
      passingYards: 3500,
      touchdowns: 28,
      interceptions: 10,
    },
  },
  {
    id: "2",
    name: "Michael Johnson",
    university: "Tech Institute",
    cost: 1000,
    category: "offense",
    position: "Running Back",
    stats: {
      rushingYards: 1200,
      touchdowns: 12,
      fumbles: 2,
    },
  },
  {
    id: "3",
    name: "David Williams",
    university: "Central College",
    cost: 900,
    category: "offense",
    position: "Wide Receiver",
    stats: {
      receptions: 85,
      receivingYards: 1100,
      touchdowns: 9,
    },
  },
  {
    id: "4",
    name: "Robert Brown",
    university: "Western University",
    cost: 850,
    category: "defense",
    position: "Linebacker",
    stats: {
      tackles: 95,
      sacks: 8.5,
      interceptions: 2,
    },
  },
  {
    id: "5",
    name: "James Davis",
    university: "Northern College",
    cost: 800,
    category: "defense",
    position: "Cornerback",
    stats: {
      tackles: 60,
      interceptions: 5,
      passesDefended: 15,
    },
  },
  {
    id: "6",
    name: "Thomas Wilson",
    university: "Eastern University",
    cost: 750,
    category: "defense",
    position: "Safety",
    stats: {
      tackles: 75,
      interceptions: 3,
      forcedFumbles: 2,
    },
  },
  {
    id: "7",
    name: "Daniel Miller",
    university: "Southern Tech",
    cost: 700,
    category: "special",
    position: "Kicker",
    stats: {
      fieldGoals: 25,
      fieldGoalPercentage: 88,
      longFieldGoal: 52,
    },
  },
  {
    id: "8",
    name: "Christopher Moore",
    university: "Coastal University",
    cost: 650,
    category: "special",
    position: "Punter",
    stats: {
      punts: 55,
      puntingAverage: 45.5,
      puntsInside20: 22,
    },
  },
  {
    id: "9",
    name: "Matthew Taylor",
    university: "Mountain State",
    cost: 950,
    category: "offense",
    position: "Tight End",
    stats: {
      receptions: 65,
      receivingYards: 750,
      touchdowns: 7,
    },
  },
  {
    id: "10",
    name: "Andrew Anderson",
    university: "Valley College",
    cost: 880,
    category: "defense",
    position: "Defensive End",
    stats: {
      tackles: 45,
      sacks: 11,
      forcedFumbles: 3,
    },
  },
  {
    id: "11",
    name: "Joseph Thomas",
    university: "Lake University",
    cost: 820,
    category: "offense",
    position: "Offensive Tackle",
    stats: {
      gamesStarted: 12,
      penaltiesCommitted: 3,
      sacksConceded: 2,
    },
  },
]

export async function GET() {
  return NextResponse.json(players)
}

