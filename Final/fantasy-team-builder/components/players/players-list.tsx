"use client"

import { useState } from "react"
import { useTeam } from "@/contexts/team-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlayerDialog } from "./player-dialog"
import type { Player } from "@/types"

export function PlayersList() {
  const { allPlayers, isLoading } = useTeam()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredPlayers = allPlayers.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading players...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Players</h2>
        <div className="w-1/3">
          <Input placeholder="Search players..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePlayerClick(player)}
          >
            <CardHeader className="pb-2">
              <CardTitle>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{player.university}</p>
              <p className="text-sm">{player.position}</p>
              <p className="font-medium mt-2">Cost: ${player.cost}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPlayer && (
        <PlayerDialog player={selectedPlayer} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      )}
    </div>
  )
}

