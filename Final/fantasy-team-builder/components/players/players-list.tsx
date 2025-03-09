// "use client"

// import { useState } from "react"
// import { useTeam } from "@/contexts/team-context"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { PlayerDialog } from "./player-dialog"
// import type { Player } from "@/types"

// export function PlayersList() {
//   const { allPlayers, isLoading } = useTeam()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const filteredPlayers = allPlayers.filter(
//     (player) =>
//       player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       player.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       player.position.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handlePlayerClick = (player: Player) => {
//     setSelectedPlayer(player)
//     setIsDialogOpen(true)
//   }

//   if (isLoading) {
//     return <div className="text-center py-8">Loading players...</div>
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">All Players</h2>
//         <div className="w-1/3">
//           <Input placeholder="Search players..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredPlayers.map((player) => (
//           <Card
//             key={player.id}
//             className="cursor-pointer hover:shadow-md transition-shadow"
//             onClick={() => handlePlayerClick(player)}
//           >
//             <CardHeader className="pb-2">
//               <CardTitle>{player.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground">{player.university}</p>
//               <p className="text-sm">{player.position}</p>
//               <p className="font-medium mt-2">Cost: ${player.cost}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {selectedPlayer && (
//         <PlayerDialog player={selectedPlayer} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
//       )}
//     </div>
//   )
// }

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
    return <div className="text-center py-8 text-blue-600 dark:text-blue-400 animate-pulse">Loading players...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">All Players</h2>
        <div className="w-1/3">
          <Input 
            placeholder="Search players..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="border-blue-200 dark:border-blue-700 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white/80 dark:bg-blue-900/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-blue-900 dark:to-blue-950 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 group"
            onClick={() => handlePlayerClick(player)}
          >
            <CardHeader className="pb-2 border-b border-blue-100 dark:border-blue-800">
              <CardTitle className="text-blue-800 dark:text-blue-200 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{player.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-blue-600 dark:text-blue-400">{player.university}</p>
                <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded-full text-xs text-blue-700 dark:text-blue-300 font-medium">{player.position}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-blue-100 dark:border-blue-800 flex justify-between items-center">
                <p className="font-medium text-blue-900 dark:text-blue-100">Cost: <span className="text-blue-700 dark:text-blue-300">${player.cost}</span></p>
                <span className="text-xs text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">View details →</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-8 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          No players found matching your search criteria.
        </div>
      )}

      {selectedPlayer && (
        <PlayerDialog player={selectedPlayer} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      )}
    </div>
  )
}