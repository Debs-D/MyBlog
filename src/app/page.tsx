"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "./layout";
import { Post as OriginalPost } from "./post";
import postsData from "./posts.json";
import { getStoredPosts } from "./storage";

type Post = OriginalPost & { image?: string };

export default function Home() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = getStoredPosts();
    const postsWithImages = [...savedPosts, ...postsData].map((post) => ({
      ...post,
    }));
    setAllPosts(postsWithImages);
  }, []);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-purple-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 px-6 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12">
          ✨ Latest Blog Posts
        </h1>

        {allPosts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No posts available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {allPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={
                    post.image ||
                    "https://via.placeholder.com/800x600?text=No+Image"
                  }
                  alt={post.title}
                  width={800}
                  height={224}
                  className="w-full h-56 object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                    ((e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x600?text=No+Image")
                  }
                  unoptimized
                  priority
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {post.author} • {post.date}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 leading-relaxed">
                    {post.content.slice(0, 220)}...
                  </p>
                  <Link
                    href="/create"
                    className="inline-block text-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-4 py-2 rounded"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
