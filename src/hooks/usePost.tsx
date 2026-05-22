import { useEffect, useState } from 'react';
import { getPostById } from '@/services/posts';
import type { Post } from '@/types/post';

type FetchResult = {
  id: string;
  post: Post | null;
  error: string | null;
};

export function usePost(id: string | undefined) {
  const [result, setResult] = useState<FetchResult | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getPostById(id)
      .then((post) => {
        if (!cancelled) setResult({ id, post, error: null });
      })
      .catch((err) => {
        if (!cancelled) {
          setResult({
            id,
            post: null,
            error: err instanceof Error ? err.message : 'Erro ao carregar post',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const loading = !result || result.id !== id;

  return {
    post: loading ? null : result.post,
    loading,
    error: loading ? null : result.error,
  };
}
