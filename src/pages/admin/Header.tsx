import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

export const Header = () => {
  return (
    <header className="flex items-center mx-auto justify-between">
      <div>
        <h1 className="text-3xl justify-center mt-8">
          Administração
        </h1>
        <h1 className="text-1xs justify-center mb-2 text-muted-foreground">
          Gerencie todos os posts, incluindo rascunhos.
        </h1>
      </div>
      <Button>
        <HugeiconsIcon icon={PlusSignIcon} />
        Novo Post
      </Button>
    </header>
  )
}

