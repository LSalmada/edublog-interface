import { createContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getPosts } from '../services/posts';
import type { Post } from '../types/post';

interface PostsContextValue {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refreshPosts: () => Promise<void>;
}

export const PostsContext = createContext<PostsContextValue | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  return (
    <PostsContext.Provider value={{ posts, loading, error, refreshPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

