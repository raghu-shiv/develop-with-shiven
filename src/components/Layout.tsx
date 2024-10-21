"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-darkKnight-text min-h-screen">
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
