import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons"
import type { Post, PostInput } from "@/types/post"

type PostFormProps = {
  initialValues?: Post
  onSubmit: (data: PostInput) => void
}

export const PostForm = ({
  initialValues,
  onSubmit,
}: PostFormProps) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState(
    initialValues?.title || ""
  )

  const [author, setAuthor] = useState(
    initialValues?.author || ""
  )

  const [content, setContent] = useState(
    initialValues?.content || ""
  )

  const [isPublished, setIsPublished] = useState(
    initialValues?.isPublished || false
  )

  const isEditing = !!initialValues

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      author,
      content,
      isPublished,
    })

    toast.success(isEditing
      ? "Postagem atualizada com sucesso!"
      : "Postagem criada com sucesso!")
    navigate("/admin")
  }

  return (
    <section className="flex justify-center my-10">
      <Card className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex justify-between items-center mb-6">
            <div>
              <CardTitle>
                {isEditing
                  ? "Editar postagem"
                  : "Nova postagem"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? "Edite os dados da postagem."
                  : "Preencha os campos para criar uma postagem."}
              </CardDescription>
            </div>
            <Link to="/admin">
              <Button variant="outline">
                <HugeiconsIcon icon={ArrowLeft02Icon} />
                Voltar
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Título</Label>

                <Input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Título da postagem"
                />
              </div>

              <div className="grid gap-2">
                <Label>Autor</Label>

                <Input
                  value={author}
                  onChange={(e) =>
                    setAuthor(e.target.value)
                  }
                  placeholder="Autor da postagem"
                />
              </div>

              <div className="grid gap-2">
                <Label>Conteúdo</Label>

                <MDEditor
                  value={content}
                  onChange={(value) =>
                    setContent(value || "")
                  }
                  height={300}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Publicado</Label>
                <Switch
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end mt-6">
            <Button type="submit">
              {isEditing
                ? "Salvar alterações"
                : "Criar postagem"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section >
  )
}