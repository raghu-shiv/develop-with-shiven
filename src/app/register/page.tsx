"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // State for reCAPTCHA token
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Load reCAPTCHA v2 script
    const loadRecaptcha = () => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.render("recaptcha-container", {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "", // Replace with your reCAPTCHA site key
              callback: (token: string) => setRecaptchaToken(token), // Set token on successful completion
            });
          });
        }
      };
    };

    loadRecaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Failed to register");
      setSuccess("Registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRecaptchaToken(null); // Reset reCAPTCHA token after successful registration
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center pt-24 pb-4 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800">
        <div className="bg-darkKnight-navbarBg p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="flex items-center justify-center space-x-2 text-2xl font-bold text-center text-white">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span>
              Develop with{" "}
              <span className="text-darkKnight-accent">Shiven</span>
            </span>
          </h1>
          <h3 className="text-gray-100 text-base mb-4 text-center">
            Create an account
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
              <span>Sign up with Google</span>
            </button>
            <p className="text-darkKnight-accent text-sm">
              OR SIGNUP VIA EMAIL
            </p>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-white">
                Name
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-800 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-darkKnight-accent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-white">
                Email
              </label>
              <input
                type="email"
                className="border border-gray-300 text-gray-800 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-darkKnight-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-white">
                Password
              </label>
              <input
                type="password"
                className="border border-gray-300 text-gray-800 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-darkKnight-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* reCAPTCHA v2 checkbox */}
            <div id="recaptcha-container" className="mb-4"></div>

            <button
              type="submit"
              className="w-full bg-transparent border border-white text-white py-2 rounded-lg text-base font-semibold shadow-lg hover:bg-darkKnight-accent hover:text-gray-800 hover:border-transparent transition duration-300"
            >
              Signup
            </button>
          </form>

          {/* Links for Register and Forgot Password with flexbox styling */}
          <div className="mt-2 text-center text-sm text-darkKnight-accent">
            <Link href="/auth/signin" className="hover:underline">
              OR LOGIN
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
