//File: src/app/api/user/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import Enrollment from "@/models/enrollment";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB connection is established

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: token.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch enrollments and populate course details
    const enrollments = await Enrollment.find({ userId: user._id }).populate(
      "courseId"
    );

    return NextResponse.json({ user, enrollments });
  } catch (error) {
    console.error("Error in /api/user/profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
