import { NextResponse } from 'next/server';
import { posts } from '@/models/post';

export async function GET() {
  // Map over the posts and include required fields such as categories, and isFeatured
  const responsePosts = posts.map(({ id, title, description, imageUrl, category, isFeatured, createdAt, authorName, authorImage, readingTime }) => ({
    id,
    title,
    description,
    imageUrl,
    category,      // Include categories to support filtering
    isFeatured,    // Include a flag for top picks
    createdAt,
    authorName,
    authorImage,
    readingTime
  }));

  return NextResponse.json(responsePosts);
}
