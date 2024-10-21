import { NextResponse } from 'next/server';
import { posts } from '@/models/post';

export async function GET(req: Request, { params }: { params: { postId: string } }) {
  const postId = params.postId;

  // Find the post by ID
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Include author information and calculate reading time
  const readingTime = Math.ceil(post.content.split(' ').length / 200); // Calculate reading time (200 words per minute)

  // Return the post details with the newly added fields
  return NextResponse.json({
    id: post.id,
    title: post.title,
    description: post.description,
    content: post.content,
    imageUrl: post.imageUrl,
    category: post.category,
    isFeatured: post.isFeatured,
    createdAt: post.createdAt,
    authorName: post.authorName,
    authorImage: post.authorImage,
    readingTime: readingTime,
  });
}
