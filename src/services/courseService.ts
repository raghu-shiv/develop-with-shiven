import { ICourse } from "@/models/course";

export const fetchCourses = async (): Promise<ICourse[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  const courses = await response.json();
  return courses.map((course: ICourse) => ({
    ...course,
    id: course.id.toString(), // Ensure id is a string
  }));
};

export const fetchCourseById = async (id: string): Promise<ICourse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`
  );
  if (!response.ok) {
    throw new Error(`Course with ID ${id} not found`);
  }
  
  const course = await response.json();
  
  return {
    ...course,
    id: course.id.toString(),  // Ensure id is a string
  };
};
