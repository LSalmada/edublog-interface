import { HugeiconsIcon } from "@hugeicons/react"
import { Github01Icon, Linkedin02Icon } from "@hugeicons/core-free-icons"

export const Footer = () => {
  return (
    <footer className="w-full border-t py-6">
      <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground">
        <span>EduBlog · Tech Challenge · Fase 03</span>

        <a href="https://github.com/LSalmada" target="blank">
          <div className="flex items-center justify-center gap-2">
            <HugeiconsIcon
              icon={Github01Icon}
              size={24}
            />
            <span>LSalmada</span>
          </div>
        </a>

        <a href="https://www.linkedin.com/in/ls-almada/?locale=pt" target="blank">
          <div className="flex items-center justify-center gap-2">
            <HugeiconsIcon
              icon={Linkedin02Icon}
              size={24}
            />
            <span>Lucas Almada</span>
          </div>
        </a>
      </div>
    </footer>
  )
}