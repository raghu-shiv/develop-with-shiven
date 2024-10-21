import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-800 to-[#123c69] text-white text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
      <p className="mb-8">
        Join thousands of learners who are achieving their career goals.
      </p>
      <div className="space-x-4">
        <Link
          href="/signup"
          className="bg-transparent border border-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-[#123c69]"
        >
          Get Started Now
        </Link>
        <Link
          href="/contact"
          className="bg-transparent border border-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-[#123c69]"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
