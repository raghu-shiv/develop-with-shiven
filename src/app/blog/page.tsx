"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Post } from "@/models/post";
import { format, isValid } from "date-fns";
import Image from "next/image";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [topPicks, setTopPicks] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
        setCategories(
          Array.from(new Set(data.map((post: Post) => post.category)))
        );
        setRecentPosts(data.slice(0, 5));
        setTopPicks(data.filter((post: Post) => post.isFeatured).slice(0, 3));
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <Layout>
      <section className="px-8 pb-16 pt-28 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-darkKnight-accent">Blog</span>
          </h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Blog Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Blog Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Top Picks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topPicks.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="bg-darkKnight-navbarBg rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-40 object-cover"
                          width={500}
                          height={500}
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-2 text-darkKnight-accent">
                            {post.title}
                          </h3>
                          <p className="text-darkKnight-text">
                            {post.description.slice(0, 39)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="flex space-x-4 overflow-x-auto">
                  {["All", ...categories].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full ${
                        selectedCategory === category
                          ? "bg-darkKnight-accent text-blue-600"
                          : "border border-white text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtered Posts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.length ? (
                  filteredPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="bg-darkKnight-navbarBg rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-40 object-cover"
                          width={500}
                          height={500}
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-2 text-darkKnight-accent">
                            {post.title}
                          </h3>
                          <p className="text-darkKnight-text">
                            {post.description.slice(0, 39)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-darkKnight-text">
                    No posts in this category.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="mb-8 border border-transparent rounded-lg p-4 bg-darkKnight-secondary">
                <h3 className="text-2xl font-bold mb-4">Most Recent</h3>

                <ul>
                  {recentPosts.map((post) => (
                    <li key={post.id} className="mb-4">
                      <Link
                        href={`/blog/${post.id}`}
                        className="hover:underline text-white"
                      >
                        {post.title}
                      </Link>
                      <p className="text-sm text-darkKnight-text">
                        {" "}
                        {isValid(new Date(post.createdAt))
                          ? format(new Date(post.createdAt), "MMMM dd, yyyy")
                          : "Invalid Date"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
