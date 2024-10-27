"use client";

import Layout from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { useCourseContext } from "@/context/CourseContext";

const Courses = () => {
  const { courses, error } = useCourseContext();

  return (
    <Layout>
      <div className="pb-16 pt-28 px-16 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 dark:bg-gray-900 text-gray-800 dark:text-darkKnight-text">
        <h1 className="text-center mb-8 text-4xl font-bold">
          Our <span className="text-darkKnight-accent">Courses</span>
        </h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter((course) => course.id !== undefined) // Ensure course.id exists
              .map((course) => (
                <div key={course.id!.toString()} className="p-4 mr-10">
                  <CourseCard
                    price={course.price}
                    title={course.title}
                    description={course.description}
                    imageUrl={course.imageUrl}
                    id={course.id || ""}
                    instructor={course.author || "Unknown Instructor"}
                    reviews={course.reviewsCount || 0}
                    rating={course.rating || 0}
                    duration=""
                    lectures={0}
                    level=""
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
