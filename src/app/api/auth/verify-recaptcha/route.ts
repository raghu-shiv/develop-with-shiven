// File: /app/api/auth/verify-recaptcha/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { recaptchaToken } = await req.json();

  if (!recaptchaToken) {
    return NextResponse.json(
      { success: false, message: "reCAPTCHA token is missing" },
      { status: 400 }
    );
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Ensure this is set in .env
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const response = await axios.post(verificationURL);
    const { success } = response.data;

    if (success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to verify reCAPTCHA" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
