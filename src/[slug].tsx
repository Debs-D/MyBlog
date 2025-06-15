import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../app/layout";
import postsData from "../app/posts.json";
import { Post } from "../app/types/post";

export default function PostDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      const found = postsData.find((p) => p.slug === slug);
      setPost(found);
    }
  }, [slug]);

  if (!post) {
    return (
      <Layout>
        <p>Post not found</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        {post.author} • {post.date}
      </p>
      <p className="text-lg">{post.content}</p>
    </Layout>
  );
}
