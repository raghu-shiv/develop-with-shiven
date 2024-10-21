"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { currencyData } from "@/data/currencyData";
import getUserCurrency from "@/services/currrencyService";
import { CiLock } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { ICourseSection } from "@/models/course";

interface CourseDetailContentProps {
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewsCount: number;
    author: string;
    whatYouWillLearn: string[];
    content: ICourseSection[];
    duration: string;
    level: string;
    lectures: number;
  };
}

const CourseDetailContent: React.FC<CourseDetailContentProps> = ({
  course,
}) => {
  const { handleAddToCart, handleBuyNow } = useCart();
  const { state } = useUser(); // Get the current user state (with enrollments)
  const [convertedPrice, setConvertedPrice] = useState(course.price);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  const isEnrolled = state.enrollments.some(
    (enrollment) => enrollment.courseId === course.id
  );

  useEffect(() => {
    const fetchCurrency = async () => {
      const country = await getUserCurrency(); // Fetch the country code like "US", "IN", etc.
      const { symbol, converter } = currencyData[country || "US"];

      setCurrencySymbol(symbol);
      setConvertedPrice(course.price * converter); // Convert the course price based on the user's currency
    };

    fetchCurrency();
  }, [course.price]);

  const courseDetails = {
    id: course.id,
    title: course.title,
    originalPrice: course.price, // Store the original price in USD
    price: convertedPrice, // Store the converted price
    imageUrl: course.imageUrl,
    instructor: course.author,
    rating: course.rating,
    reviews: course.reviewsCount,
    duration: course.duration,
    lectures: course.lectures,
    level: course.level,
    currencySymbol, // Store the currency symbol
  };

  const handleAddToCartClick = () => {
    handleAddToCart(courseDetails);
  };

  const handleBuyNowClick = () => {
    handleBuyNow(courseDetails);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-auto rounded-lg mb-4"
          />
        </div>
        <div className="flex-1 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            {course.description}
          </p>
          <div className="flex items-center">
            <span className="text-yellow-300">★★★★☆</span>
            <span className="ml-2 text-neutral-700 dark:text-neutral-300">
              {course.rating} ({course.reviewsCount} reviews)
            </span>
          </div>
          <div className="mb-4">
            <span className="text-neutral-700 dark:text-neutral-300">
              Created by {course.author}
            </span>
          </div>
          <div className="flex mb-4 justify-between">
            <span className="text-xl font-bold">
              {currencySymbol} {convertedPrice.toFixed(2)}
            </span>

            {!isEnrolled ? (
              // Only render these buttons if the user is NOT enrolled
              <div className="space-x-2">
                <button
                  onClick={handleAddToCartClick}
                  className="px-4 py-2 rounded-lg hover:bg-darkKnight-accent hover:border-none border hover:text-black bg-darkKnight-secondary text-white text-sm font-bold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNowClick}
                  className="px-4 py-2 rounded-lg hover:bg-darkKnight-accent hover:border-none border hover:text-black bg-darkKnight-secondary text-white text-sm font-bold"
                >
                  Buy Now
                </button>
              </div>
            ) : (
              // Display "Enrolled" if the user is enrolled
              <span className="text-green-500">Enrolled</span>
            )}
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What you&apos;ll learn</h2>
        <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300">
          {course.whatYouWillLearn.map((item: any, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Course Content Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <div className="space-y-4">
          {course.content.map(
            (section: ICourseSection, sectionIndex: number) => (
              <details key={sectionIndex} className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div>
                    <span className="font-bold text-lg">{section.title}</span>
                    <span className="ml-4 text-sm text-gray-500">
                      {section.totalLectures} lectures • {section.totalTime}
                    </span>
                  </div>
                  <MdArrowDropDown className="w-7 h-7" />
                </summary>
                <div className="p-4 flex justify-between">
                  {section.lectures.map(
                    (lecture: any, lectureIndex: number) => (
                      <>
                        <div
                          key={lectureIndex}
                          className="flex justify-start items-center mb-2 gap-4"
                        >
                          <span>{lecture.title}</span>
                          <span className="text-sm text-gray-500">
                            {lecture.duration}
                          </span>
                        </div>

                        <div key={lectureIndex}>
                          {sectionIndex === 0 ? (
                            <a
                              href={lecture.previewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              Preview
                            </a>
                          ) : isEnrolled ? (
                            <a
                              href={lecture.paidLink || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View
                            </a>
                          ) : (
                            <CiLock className="text-lg" />
                          )}
                        </div>
                      </>
                    )
                  )}
                </div>
              </details>
            )
          )}
        </div>
      </div>

      {/* Requirements Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          Basic understanding of JavaScript
        </p>
      </div>

      {/* Description Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
          If you don&apos;t master Node, you&apos;re shooting yourself in the
          foot. Seriously,{" "}
          <i>
            &quot;96% of professional developers rely on it for web application
            development.&quot;
          </i>
          <br />
          <br />
          So, if you want to compete as a professional developer,{" "}
          <b>you need to have this tool in your arsenal.</b>
          <br />
          <br />
          Welcome to the Complete Node.js & Express.js Developer Course, your
          thorough pathway to mastering the dynamic field of backend web
          development. This course equips you with the tools and expertise to
          flourish in a domain where Node.js and Express.js are shaping the
          future of web applications, projected to expand significantly in the
          coming years. With over 6 hours of content, first-rate lectures, and
          extensive resources, this curriculum stands out as the most exhaustive
          Node.js and Express.js guide available. Even with no prior programming
          background, you will progress from novice to expert status. Here’s
          what sets this course apart: The instruction is led by a seasoned
          software engineer with a track record of success, who has shared his
          expertise at prestigious institutions worldwide for over a decade.
          Designed to be fully up-to-date, you will learn the very latest in
          Node.js and Express.js, the same cutting-edge technologies utilized at
          innovative tech giants. We leave no stone unturned. Expect
          professional presentations, challenging assignments, practical
          projects, downloadable aids, insightful articles, and a wealth of
          additional content. The syllabus has been meticulously refined over
          several years of university teaching, augmented by thorough student
          engagement and feedback. Our teaching has transformed the lives of
          thousands, with many alumni advancing to become professional
          developers or launching their own tech ventures. Continual course
          updates mean fresh material, new projects, and learning modules guided
          by you – our student community. Within this comprehensive Node.js and
          Express.js course, you’ll delve into a spectrum of topics, including:
          The core principles of Node.js runtime and how it revolutionizes
          server-side development Express.js for building efficient, scalable
          web applications and APIs Package management mastery using npm to
          handle complex projects Database operations with Mongoose for robust
          back-end data management Advanced concepts in authentication,
          middleware, and RESTful API design ...and so much more! By the
          course&apos;s end, you will be proficient in leveraging Node.js and
          Express.js to create advanced, real-time web solutions for any demand.
          When you sign up, get ready for: Engaging Animated Video Tutorials
          Comprehensive Instruction from a Veteran Developer Real-world Node.js
          & Express.js Assignments and Projects Interactive Quizzes for
          Solidifying Knowledge Downloads: Code Snippets, Tools, and Cheatsheets
          Exclusive Articles Tailored to Node.js & Express.js A
          curriculum&apos;s worth over $1000 in Node.js & Express.js course
          materials Join us at Evergreen Programming and embark on your journey
          to becoming a Node.js & Express.js developer. Why wait? Hit the buy
          now button and enroll in this course right now! See you on the inside!
        </p>
      </div>

      {/* Who This Course is For Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Who this course is for:</h2>
        <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300">
          <li>
            Frontend developers who wish to expand their horizon in backend
            development
          </li>
          <li>Beginners who wish to develop scalable applications</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailContent;
