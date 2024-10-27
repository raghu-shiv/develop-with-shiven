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
