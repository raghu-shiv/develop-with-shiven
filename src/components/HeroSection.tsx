import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[url('/images/hero.png')]">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800"></div>

      <div className="text-center pt-48 text-white z-10">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to{" "}
          <span className="text-darkKnight-accent">Develop with Shiven</span>
        </h1>
        <p className="text-xl mb-8">
          &ldquo;Empowering Your Digital Journey: IT Courses, Services, and the
          Latest in Tech Innovation&rdquo;
        </p>
        <div className="space-x-4">
          <Link
            href="/courses"
            className="bg-transparent border border-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-gray-700"
          >
            Browse Courses
          </Link>
          <Link
            href="/blog"
            className="bg-transparent border border-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-gray-700"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
