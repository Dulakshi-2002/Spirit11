"use client"

import { useAuth } from "@/contexts/auth-context"
import { useTeam } from "@/contexts/team-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { user } = useAuth()
  const { team, getRemainingBudget, getTeamCompleteness } = useTeam()

  const remainingBudget = getRemainingBudget()
  const teamCompleteness = getTeamCompleteness()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Team Status</CardTitle>
            <CardDescription>Your current team status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamCompleteness}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget</CardTitle>
            <CardDescription>Your remaining budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${remainingBudget}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Players by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Badge variant="outline">Offense: {team.players.filter((p) => p.category === "offense").length}</Badge>
              <Badge variant="outline">Defense: {team.players.filter((p) => p.category === "defense").length}</Badge>
              <Badge variant="outline">Special: {team.players.filter((p) => p.category === "special").length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

