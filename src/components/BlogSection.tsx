import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 React Best Practices",
    excerpt:
      "Learn the best practices for building scalable and maintainable React applications.",
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt:
      "Explore the trends and technologies shaping the future of web development.",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-700 to-gray-800">
      <div className="container mx-auto">
        <h2 className="text-darkKnight-accent text-3xl font-bold text-center mb-12">
          Latest from Our Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#EBECF0] p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-darkKnight-primary text-xl font-bold mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
