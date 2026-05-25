import { PostForm } from "@/components/posts/PostForm"
import { createPost } from "@/services/posts"
import type { PostInput } from "@/types/post"

export const CreatePost = () => {
  const handleSubmit = async (data: PostInput) => {
    await createPost(data)
  }

  return (
    <PostForm onSubmit={handleSubmit} />
  )
}