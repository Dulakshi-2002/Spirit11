"use client"

import { useState } from "react"
import { useTeam } from "@/contexts/team-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PlayerCategory } from "@/types"
import type { Player } from "@/types"

export function SelectTeam() {
  const { allPlayers, addPlayer, isPlayerInTeam, canAddPlayer, getRemainingBudget, getTeamCompleteness } = useTeam()
  const [activeCategory, setActiveCategory] = useState<PlayerCategory>("offense")

  const offensePlayers = allPlayers.filter((player) => player.category === "offense")
  const defensePlayers = allPlayers.filter((player) => player.category === "defense")
  const specialPlayers = allPlayers.filter((player) => player.category === "special")

  const remainingBudget = getRemainingBudget()
  const teamCompleteness = getTeamCompleteness()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Select Your Team</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            Budget: ${remainingBudget}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {teamCompleteness}
          </Badge>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as PlayerCategory)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="offense">Offense</TabsTrigger>
          <TabsTrigger value="defense">Defense</TabsTrigger>
          <TabsTrigger value="special">Special Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="offense">
          <PlayerCategoryGrid players={offensePlayers} />
        </TabsContent>
        <TabsContent value="defense">
          <PlayerCategoryGrid players={defensePlayers} />
        </TabsContent>
        <TabsContent value="special">
          <PlayerCategoryGrid players={specialPlayers} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PlayerCategoryGrid({ players }: { players: Player[] }) {
  const { addPlayer, isPlayerInTeam, canAddPlayer } = useTeam()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {players.map((player) => {
        const isInTeam = isPlayerInTeam(player.id)
        const { canAdd, reason } = canAddPlayer(player)

        return (
          <Card key={player.id} className={isInTeam ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <CardTitle>{player.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{player.university}</p>
              <p className="text-sm">{player.position}</p>
              <p className="font-medium mt-2">Cost: ${player.cost}</p>

              {!isInTeam && (
                <Button className="w-full mt-4" onClick={() => addPlayer(player)} disabled={!canAdd} size="sm">
                  {canAdd ? "Add to Team" : reason}
                </Button>
              )}

              {isInTeam && (
                <Button variant="secondary" className="w-full mt-4" disabled size="sm">
                  Already in Team
                </Button>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

