"use client"

import { useTeam } from "@/contexts/team-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TeamPlayer } from "@/types"

export function TeamView() {
  const { team, removePlayer, getRemainingBudget, getTeamCompleteness } = useTeam()

  const remainingBudget = getRemainingBudget()
  const teamCompleteness = getTeamCompleteness()

  const offensePlayers = team.players.filter((player) => player.category === "offense")
  const defensePlayers = team.players.filter((player) => player.category === "defense")
  const specialPlayers = team.players.filter((player) => player.category === "special")

  if (team.players.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your Team</h2>
        <p>You haven't selected any players yet. Go to the "Select Team" tab to build your team.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Team</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            Budget: ${remainingBudget}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {teamCompleteness}
          </Badge>
        </div>
      </div>

      {offensePlayers.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Offense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offensePlayers.map((player) => (
              <TeamPlayerCard key={player.id} player={player} onRemove={removePlayer} />
            ))}
          </div>
        </div>
      )}

      {defensePlayers.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Defense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {defensePlayers.map((player) => (
              <TeamPlayerCard key={player.id} player={player} onRemove={removePlayer} />
            ))}
          </div>
        </div>
      )}

      {specialPlayers.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Special Teams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialPlayers.map((player) => (
              <TeamPlayerCard key={player.id} player={player} onRemove={removePlayer} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TeamPlayerCard({ player, onRemove }: { player: TeamPlayer; onRemove: (id: string) => void }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{player.university}</p>
        <p className="text-sm">{player.position}</p>
        <p className="font-medium mt-2">Cost: ${player.cost}</p>

        <Button variant="destructive" className="w-full mt-4" onClick={() => onRemove(player.id)} size="sm">
          Remove
        </Button>
      </CardContent>
    </Card>
  )
}

