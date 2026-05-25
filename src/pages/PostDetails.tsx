import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePost } from '@/hooks/usePost';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = usePost(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{post.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl mt-10 mb-10">
        <h1 className="font-heading text-3xl font-semibold tracking-wider uppercase">
          {post.title}
          <h2 className="text-sm text-muted-foreground text-left normal-case">
            {post.author} - {new Date(post.createdAt).toLocaleDateString('pt-BR')}
          </h2>
        </h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </>
  );
}