"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaSearch, FaBars, FaShoppingCart, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Define dynamic menu items
const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { state } = useCart();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scrolling behavior to show "Back to Top" button and hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Back to Top button visibility control
      if (currentScrollTop > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Hide/show navbar based on scroll direction
      if (currentScrollTop > lastScrollY) {
        setShowNavbar(false);
      } else if (currentScrollTop < lastScrollY && currentScrollTop === 0) {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Back to top scroll functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setShowNavbar(true); // Show navbar when back to top is clicked
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {showNavbar && (
        <nav className="fixed top-0 w-full bg-darkKnight-navbarBg bg-opacity-40 shadow-md z-50 py-1">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Develop with Shiven"
                    className="rounded-full"
                    height={56}
                    width={56}
                  />
                </Link>
              </div>
              {/* Dynamically render menu items */}
              <div className="hidden md:flex md:space-x-8 flex-grow justify-center">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-darkKnight-text text-lg hover:text-darkKnight-accent"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                {/* <div className="relative">
                  <input
                    type="text"
                    className="text-gray-800 hidden md:block border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-darkKnight-accent"
                    placeholder="Search..."
                  />
                  <button className="md:hidden text-darkKnight-text hover:text-darkKnight-accent">
                    <FaSearch />
                  </button>
                </div> */}
                <div className="relative">
                  <Link href="/cart">
                    <FaShoppingCart className="text-white h-6 w-6" />
                    {state.items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {state.items.length}
                      </span>
                    )}
                  </Link>
                </div>
                {session ? (
                  <div className="relative group inline-block">
                    <Image
                      src="/images/author1.jpg"
                      alt="User"
                      width={35}
                      height={35}
                      className="rounded-full cursor-pointer"
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 w-36 bg-darkKnight-navbarBg border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                      <ul className="py-1">
                        <li>
                          <a
                            href="/user/profile"
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white"
                          >
                            My Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white"
                          >
                            My Courses
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <button
                            onClick={() => signOut()}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="text-darkKnight-text text-lg hover:text-darkKnight-accent"
                    >
                      Login
                    </button>
                    <Link
                      href="/register"
                      className="text-darkKnight-text text-lg hover:text-darkKnight-accent"
                    >
                      Signup
                    </Link>
                  </>
                )}
                <button
                  className="md:hidden text-darkKnight-text hover:text-darkKnight-accent"
                  onClick={toggleMenu}
                >
                  <FaBars />
                </button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col text-center space-y-2 px-4 pb-4">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-darkKnight-text hover:text-darkKnight-accent"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="z-20 fixed bottom-52 right-8 bg-darkKnight-accent text-darkKnight-navbarBg p-3 rounded-full shadow-lg hover:bg-darkKnight-navbarBg hover:text-darkKnight-accent hover:border hover:border-darkKnight-accent transition duration-300"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default Navbar;
