import { usePosts } from '@/hooks/usePosts'
import { PostCard } from './PostCard';

const EmptyState = () => {
  return (
    <p>No posts available.</p>
  )
}
export const PostList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {posts.length === 0 ? (<EmptyState />) : (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>)
      }
    </>
  )
}