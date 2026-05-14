"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(prefersDark);
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
    document.documentElement.classList.remove(prefersDark ? "light" : "dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.add(newMode ? "dark" : "light");
    document.documentElement.classList.remove(newMode ? "light" : "dark");
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:to-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white dark:text-gray-100 tracking-wide"
        >
          ✨ MyBlog
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="text-sm font-semibold bg-white text-indigo-600 px-3 py-1.5 rounded shadow hover:bg-indigo-50 transition dark:bg-gray-100 dark:text-gray-900"
          >
            + Create Post
          </Link>

          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1.5 border cursor-pointer border-white/50 text-white rounded hover:bg-white/10 transition"
          >
            {isDarkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
