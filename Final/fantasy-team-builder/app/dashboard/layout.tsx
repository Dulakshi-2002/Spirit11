// "use client"

// import type React from "react"

// import { useAuth } from "@/contexts/auth-context"
// import { TeamProvider } from "@/contexts/team-context"
// import { ProtectedRoute } from "@/components/auth/protected-route"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useState } from "react"
// import { PlayersList } from "@/components/players/players-list"
// import { SelectTeam } from "@/components/team/select-team"
// import { TeamView } from "@/components/team/team-view"
// import { BudgetView } from "@/components/team/budget-view"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { user, logout } = useAuth()
//   const [activeTab, setActiveTab] = useState("players")

//   return (
//     <ProtectedRoute>
//       <TeamProvider>
//         <div className="min-h-screen flex flex-col">
//           <header className="bg-primary text-primary-foreground p-4">
//             <div className="container mx-auto flex justify-between items-center">
//               <h1 className="text-xl font-bold">Fantasy Team Builder</h1>
//               <div className="flex items-center gap-4">
//                 {user && <span>Welcome, {user.username}</span>}
//                 <Button variant="outline" onClick={logout}>
//                   Logout
//                 </Button>
//               </div>
//             </div>
//           </header>

//           <main className="flex-1 container mx-auto p-4">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-4">
//                 <TabsTrigger value="players">Players</TabsTrigger>
//                 <TabsTrigger value="select-team">Select Team</TabsTrigger>
//                 <TabsTrigger value="my-team">My Team</TabsTrigger>
//                 <TabsTrigger value="budget">Budget</TabsTrigger>
//               </TabsList>
//               <TabsContent value="players">
//                 <PlayersTab />
//               </TabsContent>
//               <TabsContent value="select-team">
//                 <SelectTeamTab />
//               </TabsContent>
//               <TabsContent value="my-team">
//                 <TeamTab />
//               </TabsContent>
//               <TabsContent value="budget">
//                 <BudgetTab />
//               </TabsContent>
//             </Tabs>
//           </main>
//         </div>
//       </TeamProvider>
//     </ProtectedRoute>
//   )
// }

// function PlayersTab() {
//   return <PlayersList />
// }

// function SelectTeamTab() {
//   return <SelectTeam />
// }

// function TeamTab() {
//   return <TeamView />
// }

// function BudgetTab() {
//   return <BudgetView />
// }

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
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <header className="bg-blue-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-3xl text-white">Fantasy Team Builder</h1>
              <div className="flex items-center gap-4">
                {user && <span className="text-blue-200">Welcome, <span className="font-semibold text-white">{user.username}</span></span>}
                <Button 
                  variant="outline" 
                  onClick={logout} 
                  className="border-blue-300 text-white hover:bg-blue-700 transition-colors"
                >
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 container mx-auto p-6">
            <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-blue-100 dark:bg-blue-800/40 p-1 rounded-lg mb-6">
                  <TabsTrigger 
                    value="players"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-800 dark:text-blue-200 rounded-md py-3 font-medium"
                  >
                    Players
                  </TabsTrigger>
                  <TabsTrigger 
                    value="select-team"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-800 dark:text-blue-200 rounded-md py-3 font-medium"
                  >
                    Select Team
                  </TabsTrigger>
                  <TabsTrigger 
                    value="my-team"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-800 dark:text-blue-200 rounded-md py-3 font-medium"
                  >
                    My Team
                  </TabsTrigger>
                  <TabsTrigger 
                    value="budget"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-800 dark:text-blue-200 rounded-md py-3 font-medium"
                  >
                    Budget
                  </TabsTrigger>
                </TabsList>
                <div className="bg-white dark:bg-blue-900/50 p-20 rounded-lg shadow-inner">
                  <TabsContent value="players" className="mt-0">
                    <PlayersTab />
                  </TabsContent>
                  <TabsContent value="select-team" className="mt-0">
                    <SelectTeamTab />
                  </TabsContent>
                  <TabsContent value="my-team" className="mt-0">
                    <TeamTab />
                  </TabsContent>
                  <TabsContent value="budget" className="mt-0">
                    <BudgetTab />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </main>
          
          <footer className="bg-blue-800 text-blue-200 p-3 text-center text-sm">
            © 2025 Fantasy Team Builder. Build your dream team today!
          </footer>
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