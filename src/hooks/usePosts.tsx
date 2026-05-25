import { useCallback, useEffect, useState } from 'react';
import { getPosts, getPostsAdmin } from '@/services/posts';
import type { Post } from '@/types/post';

type FetchState = {
  posts: Post[] | null;
  error: string | null;
};

type Fetcher = () => Promise<Post[]>;

function usePostsList(fetcher: Fetcher) {
  const [state, setState] = useState<FetchState>({ posts: null, error: null });

  const refreshPosts = useCallback(() => {
    return fetcher()
      .then((posts) => setState({ posts, error: null }))
      .catch((err) =>
        setState({
          posts: [],
          error: err instanceof Error ? err.message : 'Erro ao carregar posts',
        })
      );
  }, [fetcher]);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((posts) => {
        if (!cancelled) setState({ posts, error: null });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            posts: [],
            error: err instanceof Error ? err.message : 'Erro ao carregar posts',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return {
    posts: state.posts ?? [],
    loading: state.posts === null && state.error === null,
    error: state.error,
    refreshPosts,
  };
}

export function usePosts() {
  return usePostsList(getPosts);
}

export function useAdminPosts() {
  return usePostsList(getPostsAdmin);
}
