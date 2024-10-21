import { NextRequest, NextResponse } from "next/server";
import Course from "@/models/course";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  console.log("GET /api/courses called");
  await dbConnect();

  try {
    const courses = await Course.find();
    // console.log(courses);

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  console.log("POST /api/courses called");
  await dbConnect();

  try {
    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log('Token:', token);

    // if (!token) {
    //   console.log('Unauthorized access');
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const {
      title,
      description,
      price,
      imageUrl,
      reviewsCount,
      rating,
      author,
      whatYouWillLearn,
      content,
    } = await req.json();

    const newCourse = new Course({
      title,
      description,
      price,
      imageUrl,
      reviewsCount,
      rating,
      author,
      whatYouWillLearn,
      content,
    });

    await newCourse.save();

    console.log("New course created:", newCourse);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create new course" },
      { status: 500 }
    );
  }
}
