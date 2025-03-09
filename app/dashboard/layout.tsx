"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { TeamProvider } from "@/contexts/team-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PlayersList } from "@/components/players/players-list"
import { SelectTeam } from "@/components/team/select-team"
import { TeamView } from "@/components/team/team-view"
import { BudgetView } from "@/components/team/budget-view"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("players")

  return (
    <ProtectedRoute>
      <TeamProvider>
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Fantasy Team Builder</h1>
              <div className="flex items-center gap-4">
                {user && <span>Welcome, {user.username}</span>}
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 container mx-auto p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="players">Players</TabsTrigger>
                <TabsTrigger value="select-team">Select Team</TabsTrigger>
                <TabsTrigger value="my-team">My Team</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
              </TabsList>
              <TabsContent value="players">
                <PlayersTab />
              </TabsContent>
              <TabsContent value="select-team">
                <SelectTeamTab />
              </TabsContent>
              <TabsContent value="my-team">
                <TeamTab />
              </TabsContent>
              <TabsContent value="budget">
                <BudgetTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </TeamProvider>
    </ProtectedRoute>
  )
}

function PlayersTab() {
  return <PlayersList />
}

function SelectTeamTab() {
  return <SelectTeam />
}

function TeamTab() {
  return <TeamView />
}

function BudgetTab() {
  return <BudgetView />
}

