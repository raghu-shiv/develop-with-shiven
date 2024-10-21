"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const contactData: ContactInfo[] = [
    {
      icon: <FaEnvelope className="text-3xl text-indigo-500 mb-4" />,
      title: "Email",
      description: "developer.raghuvanshi@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-indigo-500 mb-4" />,
      title: "Office Address",
      description:
        "29, Near Nageshwar Mandir, Chanakyapuri, Sehore, Madhya Pradesh, IN",
    },
    {
      icon: <FaPhoneAlt className="text-3xl text-indigo-500 mb-4" />,
      title: "Phone",
      description: "+91 7048403182",
    },
  ];

  return (
    <Layout>
      <section className="relative px-4 pb-16 pt-28 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-white min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">
            Contact <span className="text-darkKnight-accent">Us</span>
          </h1>

          {/* Dynamic Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactData.map((info, index) => (
              <div
                key={index}
                className="flex flex-col text-center items-center justify-center p-6 dark:bg-darkKnight-navbarBg text-darkKnight-text rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:bg-darkKnight-accent hover:text-darkKnight-primary transition-all duration-300"
              >
                {info.icon}
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p>{info.description}</p>
              </div>
            ))}
          </div>

          {/* Google Map Section */}
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6167.20320865846!2d77.10412086059033!3d23.20517756850861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726300955313!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Image with Form Centered */}
          <div className="relative w-full h-full mb-12">
            <Image
              src="/images/contact-image.jpg"
              alt="Contact"
              width={1200}
              height={500}
              className="rounded-lg object-cover w-full h-full"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="dark:bg-darkKnight-secondary p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl opacity-80 mx-4 md:mx-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-darkKnight-text text-center">
                  Get in touch with us
                </h2>
                {error && (
                  <p className="text-red-500 mb-4 text-center">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 mb-4 text-center">{success}</p>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label className="block text-lg font-medium">Name</label>
                    <input
                      type="text"
                      className="text-gray-800 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={name}
                      placeholder="Your name here"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium">Email</label>
                    <input
                      type="email"
                      className="text-gray-800 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={email}
                      placeholder="Your email here"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium">Message</label>
                    <textarea
                      className="text-gray-800 border border-gray-300 rounded-lg px-4 py-2 w-full h-28 md:h-32 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                      value={message}
                      placeholder="Type your query here"
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-auto bg-transparent text-white border px-4 py-2 rounded-lg font-semibold hover:border-transparent hover:bg-darkKnight-accent hover:text-gray-800 transition duration-300"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
