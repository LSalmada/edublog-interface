import { api } from "./api";
import type { Post, PostInput } from "../types/post";

export function getPosts(): Promise<Post[]> {
  return api("/posts");
}

export function getPostsAdmin(): Promise<Post[]> {
  return api("/admin/posts");
}

export function getPostById(id: string): Promise<Post> {
  return api(`/posts/${id}`);
}

export function createPost(data: PostInput): Promise<Post> {
  return api("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePost(id: string, data: PostInput): Promise<Post> {
  return api(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deletePost(id: string): Promise<void> {
  return api(`/posts/${id}`, {
    method: "DELETE",
  });
}

export function searchPosts(query: string): Promise<Post[]> {
  return api(`/posts/search?query=${encodeURIComponent(query)}`);
}