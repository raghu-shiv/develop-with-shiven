import { NextRequest, NextResponse } from "next/server";
import Enrollment from "@/models/enrollment";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const {
    order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
    userId,
  } = await req.json();

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET!);
  hmac.update(`${order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      await dbConnect();
      const newEnrollment = new Enrollment({
        userId,
        courseId,
      });

      await newEnrollment.save();
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Enrollment failed" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 400 }
    );
  }
}
