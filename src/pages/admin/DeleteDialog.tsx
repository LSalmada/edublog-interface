import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

import { deletePost } from "@/services/posts"
import { toast } from "sonner"

type Props = {
  id: string
  title: string
  onDeleted?: () => void
}

export function DeleteDialog({ id, title, onDeleted }: Props) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    try {
      setDeleting(true)
      setError(null)

      await deletePost(id)

      setOpen(false)
      toast.success("Postagem excluída com sucesso!")
      onDeleted?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o post."
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:text-primary">
        <HugeiconsIcon icon={Delete02Icon} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Excluir post?</DialogTitle>
          <DialogDescription className="mt-5">
            Esta ação não pode ser desfeita. O post "<strong className="font-medium text-foreground">{title}</strong>" será permanentemente removido.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" disabled={deleting}>Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
