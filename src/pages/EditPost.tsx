import { PostForm } from "@/components/posts/PostForm"
import { usePost } from "@/hooks/usePost";
import { updatePost } from "@/services/posts"
import type { Post, PostInput } from "@/types/post"
import { useParams } from "react-router-dom";

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = usePost(id);

  const handleSubmit = async (data: PostInput) => {
    await updatePost(id as string, data)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <PostForm initialValues={post as Post} onSubmit={handleSubmit} />
  )
}