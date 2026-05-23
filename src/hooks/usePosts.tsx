import { useCallback, useEffect, useState } from 'react';
import { getPosts } from '@/services/posts';
import type { Post } from '@/types/post';

type FetchState = {
  posts: Post[] | null;
  error: string | null;
};

export function usePosts() {
  const [state, setState] = useState<FetchState>({ posts: null, error: null });

  const refreshPosts = useCallback(() => {
    return getPosts().then((posts) => setState({ posts, error: null }))
      .catch((err) => setState({
        posts: [],
        error: err instanceof Error ? err.message : 'Erro ao carregar posts',
      })
      );
  }, []);

  useEffect(() => {
    let cancelled = false;

    getPosts().then((posts) => {
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

    return () => { cancelled = true; };
  }, []);

  return {
    posts: state.posts ?? [],
    loading: state.posts === null && state.error === null,
    error: state.error,
    refreshPosts,
  };
}
