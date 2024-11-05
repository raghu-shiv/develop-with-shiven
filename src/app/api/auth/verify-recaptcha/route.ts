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

  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Ensure this is set in .env
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set in the environment.");
    return NextResponse.json(
      { success: false, message: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    const response = await axios.post(verificationURL);
    const { success } = response.data;

    return success
      ? NextResponse.json({ success: true }, { status: 200 })
      : NextResponse.json(
          { success: false, message: "Failed to verify reCAPTCHA" },
          { status: 400 }
        );
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
