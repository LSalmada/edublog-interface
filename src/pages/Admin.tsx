import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Header } from "./admin/Header"
import { DeleteDialog } from "./admin/DeleteDialog";
import { useAdminPosts } from "@/hooks/usePosts"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon } from "@hugeicons/core-free-icons"

export const Admin = () => {
  const { posts, loading, error, refreshPosts } = useAdminPosts()

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  if (loading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Header />
      <section className="border px-8 py-2 mt-6 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[500px]">Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <Link to={`/admin/post/${post.id}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </TableCell>

                <TableCell className="font-medium">
                  {post.author}
                </TableCell>

                <TableCell className="font-medium">
                  {post.isPublished ? <Badge className="bg-primary">Publicado</Badge> : <Badge className="bg-gray-600">Rascunho</Badge>}
                </TableCell>

                <TableCell className="font-medium">
                  {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>

                <TableCell className="flex flex-row justify-end gap-4">
                  <DeleteDialog
                    id={post.id.toString()}
                    title={post.title}
                    onDeleted={refreshPosts}
                  />
                  <Link to={`/admin/post/${post.id}`} className="hover:text-primary">
                    <HugeiconsIcon icon={Edit02Icon} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between py-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      </section>
    </>
  )
}




