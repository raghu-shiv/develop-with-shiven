"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Post } from "@/models/post";
import { format, isValid } from "date-fns";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { postId } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchPost();
  }, [postId]);

  if (error)
    return (
      <Layout>
        <p className="text-red-500">{error}</p>
      </Layout>
    );

  return (
    <Layout>
      {post ? (
        <article className="py-16 bg-darkKnight-primary">
          <div className="container mx-auto max-w-4xl">
            {/* Blog Title */}
            <h1 className="text-5xl font-bold mb-6 text-darkKnight-accent">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center mb-6">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-lg font-bold text-darkKnight-text">
                  {post.authorName}
                </p>
                <p className="text-sm text-darkKnight-text">
                  {isValid(new Date(post.createdAt))
                    ? format(new Date(post.createdAt), "MMMM dd, yyyy")
                    : "Invalid Date"}{" "}
                  · {post.readingTime} min read
                </p>
              </div>
            </div>

            {/* Blog Image */}
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto mb-8 rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
            />

            {/* Blog Content */}
            <div className="text-darkKnight-text leading-relaxed text-lg">
              <p>{post.content}</p>
            </div>
          </div>
        </article>
      ) : (
        <p className="text-darkKnight-accent">Loading...</p>
      )}
    </Layout>
  );
};

export default PostPage;
