"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Player, TeamPlayer, Team } from "@/types"

type TeamContextType = {
  team: Team
  allPlayers: Player[]
  isLoading: boolean
  addPlayer: (player: Player) => void
  removePlayer: (playerId: string) => void
  getPlayerById: (playerId: string) => Player | undefined
  getRemainingBudget: () => number
  getTeamCompleteness: () => string
  isPlayerInTeam: (playerId: string) => boolean
  canAddPlayer: (player: Player) => { canAdd: boolean; reason?: string }
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

const INITIAL_BUDGET = 5000
const MAX_PLAYERS = 11

export function TeamProvider({ children }: { children: ReactNode }) {
  const [team, setTeam] = useState<Team>({
    players: [],
    budget: INITIAL_BUDGET,
    maxPlayers: MAX_PLAYERS,
  })
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players")
        const data = await response.json()
        setAllPlayers(data)
      } catch (error) {
        console.error("Failed to fetch players:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  const addPlayer = (player: Player) => {
    const canAddResult = canAddPlayer(player)
    if (!canAddResult.canAdd) {
      return
    }

    const teamPlayer: TeamPlayer = { ...player, selected: true }
    setTeam((prev) => ({
      ...prev,
      players: [...prev.players, teamPlayer],
      budget: prev.budget - player.cost,
    }))
  }

  const removePlayer = (playerId: string) => {
    const player = team.players.find((p) => p.id === playerId)
    if (!player) return

    setTeam((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== playerId),
      budget: prev.budget + player.cost,
    }))
  }

  const getPlayerById = (playerId: string) => {
    return allPlayers.find((p) => p.id === playerId)
  }

  const getRemainingBudget = () => {
    return team.budget
  }

  const getTeamCompleteness = () => {
    return `${team.players.length}/${team.maxPlayers} players selected`
  }

  const isPlayerInTeam = (playerId: string) => {
    return team.players.some((p) => p.id === playerId)
  }

  const canAddPlayer = (player: Player) => {
    // Check if team is already full
    if (team.players.length >= team.maxPlayers) {
      return { canAdd: false, reason: "Team is already full" }
    }

    // Check if player is already in team
    if (isPlayerInTeam(player.id)) {
      return { canAdd: false, reason: "Player is already in your team" }
    }

    // Check if budget is sufficient
    if (player.cost > team.budget) {
      return { canAdd: false, reason: "Not enough budget" }
    }

    // Check if player category already has maximum players
    const categoryCount = team.players.filter((p) => p.category === player.category).length
    const maxPerCategory = 4 // Adjust as needed
    if (categoryCount >= maxPerCategory) {
      return {
        canAdd: false,
        reason: `You can only have ${maxPerCategory} players from the ${player.category} category`,
      }
    }

    return { canAdd: true }
  }

  return (
    <TeamContext.Provider
      value={{
        team,
        allPlayers,
        isLoading,
        addPlayer,
        removePlayer,
        getPlayerById,
        getRemainingBudget,
        getTeamCompleteness,
        isPlayerInTeam,
        canAddPlayer,
      }}
    >
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}

