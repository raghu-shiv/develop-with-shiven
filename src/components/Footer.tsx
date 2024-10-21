// src/components/Footer.js
import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Importing icons

const Footer = () => {
  return (
    <footer className="p-8 bg-darkKnight-navbarBg text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Explore Section */}
          <div>
            <h4 className="font-bold mb-4 text-center hover:text-darkKnight-accent">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="no-underline">
                  About
                </a>
              </li>
              <li>
                <a href="/courses" className="no-underline">
                  Courses
                </a>
              </li>
              <li>
                <a href="/blog" className="no-underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="no-underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="font-bold mb-4 text-center hover:text-darkKnight-accent">
              Our Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>Web Designing</li>
                <li>Web Development</li>
                <li>E-Commerce Solution</li>
                <li>Mobile App Development</li>
              </ul>
              <ul className="space-y-2">
                <li>Data Visualization</li>
                <li>Artificial Intelligence</li>
                <li>Modern Keyword Analysis</li>
                <li>Search Engine Optimization</li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="font-bold mb-4 text-center hover:text-darkKnight-accent">
              Follow Us
            </h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="mt-8 border-t border-gray-600 pt-4 flex justify-between">
          <p className="text-left">
            &copy; {new Date().getFullYear()} Develop with Shiven. All rights
            reserved.
          </p>
          <p className="text-right">
            <a href="/sitemap" className="no-underline">
              Sitemap
            </a>{" "}
            |{" "}
            <a href="/terms" className="no-underline">
              Terms
            </a>{" "}
            |{" "}
            <a href="/privacy" className="no-underline">
              Privacy Notice
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
