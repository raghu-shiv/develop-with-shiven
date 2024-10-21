import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import CourseDetailContent from "@/components/CourseDetailContent";
import { UserProvider } from "@/context/UserContext";

type CourseDetailPageProps = {
  params: {
    id: string;
  };
};

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { id } = params;

  if (!id) {
    return notFound();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`
    );

    if (!res.ok) {
      console.error(`Failed to fetch course with ID ${id}`);
      return notFound();
    }

    const course = await res.json();

    if (!course) {
      return notFound();
    }

    return (
      <UserProvider>
        <Layout>
          <div className="pt-24 p-6 max-w-5xl bg-darkKnight-primary bg-opacity-20 mx-auto">
            <CourseDetailContent course={course} />
          </div>
        </Layout>
      </UserProvider>
    );
  } catch (error) {
    console.error("Failed to fetch course with ID:", id);
    return notFound();
  }
};

export default CourseDetailPage;
