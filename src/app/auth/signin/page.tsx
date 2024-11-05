// File: /app/auth/signin.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

// Extend window interface to recognize grecaptcha
declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const router = useRouter();

  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  useEffect(() => {
    // Load reCAPTCHA v2 script
    const loadRecaptcha = () => {
      if (!document.querySelector("#recaptcha-script")) {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js`;
        script.async = true;
        script.defer = true;
        script.id = "recaptcha-script";

        document.body.appendChild(script);

        script.onload = () => {
          // Ensure grecaptcha is ready
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
              // Render the reCAPTCHA widget once grecaptcha is ready
              window.grecaptcha.render("recaptcha-container", {
                sitekey: RECAPTCHA_SITE_KEY, // Replace with your reCAPTCHA v2 site key
                callback: (token: string) => setRecaptchaToken(token), // Set token on successful completion
              });
            });
          }
        };
      }
    };

    loadRecaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    // Verify reCAPTCHA token first
    const recaptchaRes = await fetch("/api/auth/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recaptchaToken }),
    });

    const recaptchaResult = await recaptchaRes.json();

    if (!recaptchaResult.success) {
      setError("reCAPTCHA verification failed. Please try again.");
      return;
    }

    const res = await signIn("Credentials", {
      redirect: false,
      email,
      password,
    });

    res?.error ? setError(res.error) : router.push("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pt-20 h-screen bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800">
        <div className="bg-darkKnight-navbarBg px-8 py-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="flex items-center justify-center space-x-2 text-2xl font-semibold text-center text-white">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span>
              Develop with{" "}
              <span className="text-darkKnight-accent">Shiven</span>
            </span>
          </h1>
          <h3 className="text-gray-100 text-base mb-4 text-center">
            Welcome back!
          </h3>

          {/* Google Sign in */}
          <div className="flex flex-col text-center justify-center mb-6 text-sm gap-2">
            <button
              onClick={() => signIn("google")}
              className="flex flex-row row-span-1 items-center justify-center space-x-2 px-4 py-2 bg-darkKnight-primary border border-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-white"
            >
              <Image
                src="/images/google.png"
                alt="Google"
                width={20}
                height={20}
              />
              <span>Sign in with Google</span>
            </button>
            <p className="text-darkKnight-accent text-sm">OR LOGIN VIA EMAIL</p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label
                className="block text-white text-base font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkKnight-accent"
                required
              />
              {/* Move Forgot Password link here */}
              <Link
                href="/forgot-password"
                className="text-darkKnight-accent text-right hover:underline block mt-2 text-xs"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-base font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkKnight-accent"
                required
              />
            </div>

            {/* reCAPTCHA container */}
            <div id="recaptcha-container" className="mb-4"></div>

            <button
              type="submit"
              className="w-full bg-transparent text-white py-2 border rounded-lg text-base font-semibold hover:bg-darkKnight-accent hover:text-gray-800 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Register link stays below */}
          <div className="mt-4 text-sm text-center">
            <Link
              href="/register"
              className="text-darkKnight-accent hover:underline"
            >
              OR SIGNUP
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
