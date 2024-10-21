import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Mastering React",
    instructor: "John Doe",
    rating: 4.8,
    imageUrl: "/course-image.png",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    instructor: "Jane Smith",
    rating: 4.7,
    imageUrl: "/course-image.png",
  },
  {
    id: 3,
    title: "Fullstack Development",
    instructor: "James Bond",
    rating: 4.9,
    imageUrl: "/course-image.png",
  },
  {
    id: 4,
    title: "Python Microservices",
    instructor: "James Bond",
    rating: 4.9,
    imageUrl: "/course-image.png",
  },
];

export default function FeaturedCourses() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Scroll function
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth =
        scrollRef.current.firstElementChild?.getBoundingClientRect().width ||
        300;
      const scrollAmount =
        direction === "left" ? -cardWidth * 1.2 : cardWidth * 1.2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      updateScrollStatus();
    }
  };

  // Update scroll button visibility based on current scroll position
  const updateScrollStatus = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);

      // Check if right scroll has reached the end by considering any minor float difference
      const maxScrollLeft = scrollWidth - clientWidth;
      setCanScrollRight(scrollLeft < maxScrollLeft - 1);
    }
  };

  useEffect(() => {
    // Store ref in a variable to avoid lint warnings
    const scrollContainer = scrollRef.current;

    // Update scroll status on component mount and when the user scrolls
    updateScrollStatus();
    const handleScroll = () => updateScrollStatus();

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-700 relative">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
        >
          Top Courses to{" "}
          <span className="text-darkKnight-accent">Get You Started</span>
        </motion.h2>

        {/* Left Scroll Button (visible only if can scroll left) */}
        {canScrollLeft && (
          <button
            className="absolute left-4 top-[60%] transform -translate-y-1/2 z-20 bg-darkKnight-accent text-darkKnight-primary p-3 rounded-full hover:bg-darkKnight-primary hover:text-darkKnight-accent"
            onClick={() => scroll("left")}
          >
            <FaAngleDoubleLeft />
          </button>
        )}

        {/* Right Scroll Button (visible only if can scroll right) */}
        {canScrollRight && (
          <button
            className="absolute right-4 top-[60%] transform -translate-y-1/2 z-20 bg-darkKnight-accent text-darkKnight-primary p-3 rounded-full hover:bg-darkKnight-primary hover:text-darkKnight-accent"
            onClick={() => scroll("right")}
          >
            <FaAngleDoubleRight />
          </button>
        )}

        {/* Horizontal Scroll Container */}
        <motion.div
          className="flex overflow-x-scroll scroll-hidden space-x-8 px-8 py-2 scroll-smooth"
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="min-w-[300px] md:min-w-[400px] lg:min-w-[450px] text-darkKnight-text bg-darkKnight-navbarBg p-6 rounded-lg shadow-lg hover:bg-darkKnight-accent transition-all transform duration-300 hover:scale-105 hover:text-darkKnight-primary flex flex-col"
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Text Section */}
                <div className="md:w-1/2 pr-4">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="mb-4">By {course.instructor}</p>
                  <p className="text-yellow-400 mb-4">
                    Rating: {course.rating} ★
                  </p>
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Learn More
                  </Link>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2">
                  <Image
                    src={course.imageUrl}
                    alt="Course Image"
                    layout="responsive"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
