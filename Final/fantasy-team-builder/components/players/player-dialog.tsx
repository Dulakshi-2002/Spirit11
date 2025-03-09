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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{player.name}</DialogTitle>
          <DialogDescription>
            {player.position} - {player.university}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Category:</span>
            <Badge variant="outline" className="capitalize">
              {player.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Cost:</span>
            <span>${player.cost}</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Stats:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(player.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          {!isInTeam && (
            <Button onClick={handleAddPlayer} disabled={!canAdd} className="w-full">
              {canAdd ? "Add to Team" : reason}
            </Button>
          )}
          {isInTeam && (
            <Button variant="secondary" disabled className="w-full">
              Already in Team
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

