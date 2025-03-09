"use client"

import { useTeam } from "@/contexts/team-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function BudgetView() {
  const { team, getRemainingBudget } = useTeam()

  const initialBudget = 5000 // Same as in TeamProvider
  const remainingBudget = getRemainingBudget()
  const spentBudget = initialBudget - remainingBudget
  const budgetPercentage = (spentBudget / initialBudget) * 100

  const sortedPlayers = [...team.players].sort((a, b) => b.cost - a.cost)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Budget Tracker</h2>

      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Initial Budget:</span>
            <span className="font-medium">${initialBudget}</span>
          </div>
          <div className="flex justify-between">
            <span>Spent:</span>
            <span className="font-medium">${spentBudget}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining:</span>
            <span className="font-medium">${remainingBudget}</span>
          </div>

          <Progress value={budgetPercentage} className="h-2" />

          <p className="text-sm text-muted-foreground text-center">{budgetPercentage.toFixed(1)}% of budget used</p>
        </CardContent>
      </Card>

      {team.players.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Player Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sortedPlayers.map((player) => (
                <div key={player.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.position}</p>
                  </div>
                  <span>${player.cost}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

