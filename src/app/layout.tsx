import type { Metadata } from "next";
import "../styles/globals.css";
import ClientSessionProvider from "../components/ClientSessionProvider";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { CourseProvider } from "@/context/CourseContext";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Develop with Shiven",
  description:
    "Develop with Shiven is an initiative towards many causes such as Online IT Courses, Daily Blog, AI Literacy and Mastery",
  icons: {
    icon: "/favicon.ico", // default favicon
    shortcut: "/favicon.ico", // shortcut icon for browsers
    apple: "/apple-touch-icon.png", // for Apple devices
    other: [
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" }, // additional sizes
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AuthProvider>
            <CourseProvider>
              <CartProvider>
                <ClientSessionProvider>
                  <Navbar />
                  {children}
                </ClientSessionProvider>
              </CartProvider>
            </CourseProvider>
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
