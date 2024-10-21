// src/models/post.ts
export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  createdAt: string;
  authorName: string;
  authorImage: string;
  readingTime: number; // in minutes
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    description: 'This is the description of the first post.',
    content: 'This is the content of the first post.',
    imageUrl: '/images/post1.jpg',
    category: 'Development',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    authorName: 'Shivendra Raghuvanshi',
    authorImage: '/images/author1.jpg',
    readingTime: Math.ceil('This is the content of the first post...'.split(' ').length / 200) // Assuming 200 words per minute
  },
  {
    id: '2',
    title: 'Second Post',
    description: 'This is the description of the second post.',
    content: 'This is the content of the second post.',
    imageUrl: '/images/post2.jpg',
    category: 'Design',
    isFeatured: false,
    createdAt: new Date().toISOString(),
    authorName: 'Shivendra Raghuvanshi',
    authorImage: '/images/author2.jpg',
    readingTime: Math.ceil('This is the content of the second post...'.split(' ').length / 200)
  }
];
