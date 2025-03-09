// "use client"

// import { useAuth } from "@/contexts/auth-context"
// import { useTeam } from "@/contexts/team-context"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

// export default function DashboardPage() {
//   const { user } = useAuth()
//   const { team, getRemainingBudget, getTeamCompleteness } = useTeam()

//   const remainingBudget = getRemainingBudget()
//   const teamCompleteness = getTeamCompleteness()

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Team Status</CardTitle>
//             <CardDescription>Your current team status</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{teamCompleteness}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Budget</CardTitle>
//             <CardDescription>Your remaining budget</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">${remainingBudget}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Categories</CardTitle>
//             <CardDescription>Players by category</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex gap-2">
//               <Badge variant="outline">Offense: {team.players.filter((p) => p.category === "offense").length}</Badge>
//               <Badge variant="outline">Defense: {team.players.filter((p) => p.category === "defense").length}</Badge>
//               <Badge variant="outline">Special: {team.players.filter((p) => p.category === "special").length}</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

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
    <div className="space-y-8 p-4">
      <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-100">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 dark:text-blue-200">Team Status</CardTitle>
            <CardDescription className="text-blue-500 dark:text-blue-300">Your current team status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-800 dark:text-blue-100">{teamCompleteness}</div>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-300">Team completion</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 dark:text-blue-200">Budget</CardTitle>
            <CardDescription className="text-blue-500 dark:text-blue-300">Your remaining budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">${remainingBudget}</div>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-300">Available to spend</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 dark:text-blue-200">Categories</CardTitle>
            <CardDescription className="text-blue-500 dark:text-blue-300">Players by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white">
                Offense: {team.players.filter((p) => p.category === "offense").length}
              </Badge>
              <Badge className="bg-red-600 hover:bg-red-700 px-3 py-1 text-white">
                Defense: {team.players.filter((p) => p.category === "defense").length}
              </Badge>
              <Badge className="bg-purple-600 hover:bg-purple-700 px-3 py-1 text-white">
                Special: {team.players.filter((p) => p.category === "special").length}
              </Badge>
            </div>
            <div className="mt-4 text-sm text-blue-600 dark:text-blue-300">
              Total players: {team.players.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}