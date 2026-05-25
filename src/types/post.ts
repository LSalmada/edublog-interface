export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export type PostInput = Pick<Post, "title" | "content" | "author" | "isPublished">
