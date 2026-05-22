import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon, DateTimeIcon, ArrowRight04Icon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { stripMarkdown } from "@/lib/markdown";

interface PostProps {
  id: number,
  title: string,
  author: string,
  content: string
  createdAt: string
}

export const PostCard = (post: PostProps) => {
  return (
    <Card size="sm" className="flex h-full flex-col transition-shadow hover:bg-muted">
      <CardHeader>
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-1">
              <HugeiconsIcon icon={UserIcon} />
              {post.author}
            </div>
            <div className="flex flex-row items-center gap-1">
              <HugeiconsIcon icon={DateTimeIcon} />
              {new Date(post.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">
          {stripMarkdown(post.content)}
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm" asChild>
          <Link to={`/post/${post.id}`}>
            <HugeiconsIcon icon={ArrowRight04Icon} />
            Ler mais
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
