import { Post } from "./post";

export const getPosts = (): Post[] => {
  if (typeof window === "undefined") return [];
  const posts = localStorage.getItem("posts");
  return posts ? JSON.parse(posts) : [];
};

export const savePost = (post: Post) => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("posts");
  const posts: Post[] = stored ? JSON.parse(stored) : [];
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const getStoredPosts = (): Post[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("posts");
  return stored ? JSON.parse(stored) : [];
};
