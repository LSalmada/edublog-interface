"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { PostList } from "@/components/posts/PostList"
import { searchPosts } from "@/services/posts"
import type { Post } from "@/types/post"

export const Home = () => {
  return (
    <>
      <CommandWithShortcuts />
      <PostList />
    </>
  )
}

type SearchState = { query: string; results: Post[] }

export function CommandWithShortcuts() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [state, setState] = React.useState<SearchState>({ query: "", results: [] })

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) return

    let cancelled = false
    const timeoutId = window.setTimeout(() => {
      searchPosts(trimmed)
        .then((results) => {
          if (!cancelled) setState({ query: trimmed, results })
        })
        .catch(() => {
          if (!cancelled) setState({ query: trimmed, results: [] })
        })
    }, 300)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [query])

  const trimmedQuery = query.trim()
  const isStale = trimmedQuery !== state.query
  const loading = trimmedQuery !== "" && isStale
  const results = trimmedQuery && !isStale ? state.results : []

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
    if (!value) setQuery("")
  }

  const handleSelect = (id: number) => {
    handleOpenChange(false)
    navigate(`/post/${id}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Buscar posts
        <CommandShortcut>⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Buscar posts..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && (
              <div className="px-4 py-3 text-sm text-muted-foreground">Buscando...</div>
            )}
            {!loading && trimmedQuery && results.length === 0 && (
              <CommandEmpty>Nenhum post encontrado.</CommandEmpty>
            )}
            {results.length > 0 && (
              <CommandGroup heading="Posts">
                {results.map((post) => (
                  <CommandItem
                    key={post.id}
                    value={String(post.id)}
                    onSelect={() => handleSelect(post.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{post.title}</span>
                      <span className="text-xs text-muted-foreground">{post.author}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
