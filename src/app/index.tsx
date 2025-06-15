"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "./layout";
import { Post } from "./post";
import postsData from "./posts.json";
import { getStoredPosts } from "./storage";

export default function Home() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = getStoredPosts();
    setAllPosts([...savedPosts, ...postsData]);
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="space-y-6">
        {allPosts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          allPosts.map((post) => (
            <div key={post.slug} className="border p-4 rounded shadow">
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm">
                {post.author} • {post.date}
              </p>
              <p className="mt-2 text-gray-800">
                {post.content.slice(0, 100)}...
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
