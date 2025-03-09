// "use client"

// import { useTeam } from "@/contexts/team-context"
// import type { Player } from "@/types"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

// interface PlayerDialogProps {
//   player: Player
//   isOpen: boolean
//   onClose: () => void
// }

// export function PlayerDialog({ player, isOpen, onClose }: PlayerDialogProps) {
//   const { addPlayer, isPlayerInTeam, canAddPlayer } = useTeam()

//   const isInTeam = isPlayerInTeam(player.id)
//   const { canAdd, reason } = canAddPlayer(player)

//   const handleAddPlayer = () => {
//     addPlayer(player)
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>{player.name}</DialogTitle>
//           <DialogDescription>
//             {player.position} - {player.university}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="flex items-center justify-between">
//             <span className="font-medium">Category:</span>
//             <Badge variant="outline" className="capitalize">
//               {player.category}
//             </Badge>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="font-medium">Cost:</span>
//             <span>${player.cost}</span>
//           </div>

//           <div className="space-y-2">
//             <h4 className="font-medium">Stats:</h4>
//             <div className="grid grid-cols-2 gap-2">
//               {Object.entries(player.stats).map(([key, value]) => (
//                 <div key={key} className="flex justify-between">
//                   <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
//                   <span className="text-sm font-medium">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <DialogFooter>
//           {!isInTeam && (
//             <Button onClick={handleAddPlayer} disabled={!canAdd} className="w-full">
//               {canAdd ? "Add to Team" : reason}
//             </Button>
//           )}
//           {isInTeam && (
//             <Button variant="secondary" disabled className="w-full">
//               Already in Team
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import { useTeam } from "@/contexts/team-context"
import type { Player } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PlayerDialogProps {
  player: Player
  isOpen: boolean
  onClose: () => void
}

export function PlayerDialog({ player, isOpen, onClose }: PlayerDialogProps) {
  const { addPlayer, isPlayerInTeam, canAddPlayer } = useTeam()

  const isInTeam = isPlayerInTeam(player.id)
  const { canAdd, reason } = canAddPlayer(player)

  const handleAddPlayer = () => {
    addPlayer(player)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950 border-blue-200 dark:border-blue-800 shadow-lg">
        <DialogHeader className="border-b border-blue-200 dark:border-blue-800 pb-4">
          <DialogTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">{player.name}</DialogTitle>
          <DialogDescription className="text-blue-600 dark:text-blue-300">
            {player.position} - {player.university}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between">
            <span className="font-medium text-blue-800 dark:text-blue-200">Category:</span>
            <Badge variant="outline" className="capitalize bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 border-blue-300 dark:border-blue-600">
              {player.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-blue-800 dark:text-blue-200">Cost:</span>
            <span className="text-blue-900 dark:text-blue-100 font-semibold">${player.cost}</span>
          </div>

          <div className="space-y-2 bg-blue-100/50 dark:bg-blue-800/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Stats:</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(player.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between bg-white/70 dark:bg-blue-900/40 p-2 rounded border border-blue-200 dark:border-blue-700">
                  <span className="text-sm capitalize text-blue-700 dark:text-blue-300">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-blue-200 dark:border-blue-800 pt-4">
          {!isInTeam && (
            <Button 
              onClick={handleAddPlayer} 
              disabled={!canAdd} 
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 disabled:bg-blue-300 dark:disabled:bg-blue-700 disabled:text-blue-500 dark:disabled:text-blue-300"
            >
              {canAdd ? "Add to Team" : reason}
            </Button>
          )}
          {isInTeam && (
            <Button 
              variant="secondary" 
              disabled 
              className="w-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
            >
              Already in Team
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}