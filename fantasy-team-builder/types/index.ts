export type PlayerCategory = "offense" | "defense" | "special"

// export interface Player {
//   id: string
//   name: string
//   university: string
//   cost: number
//   category: PlayerCategory
//   position: string
//   stats: {
//     [key: string]: number
//   }
//   image?: string
// }

export type Player = {
  id: string
  name: string
  university: string
  cost: number
  category: string
  position: string
  stats: {
    totalRuns: number
    ballsFaced: number
    inningsPlayed: number
    wickets: number
    oversBowled: number
    runsConceded: number
  }
}



export interface TeamPlayer extends Player {
  selected: boolean
}

export interface Team {
  players: TeamPlayer[]
  budget: number
  maxPlayers: number
}

