"use client";

import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Image from "next/image";

const aboutData = {
  mission:
    "Our mission is to democratize education by making high-quality courses accessible to everyone, everywhere. We believe in the power of knowledge to transform lives and create a better world.",
  vision:
    "We envision a world where learning is a lifelong journey. Anyone can learn anything, at any time, and from anywhere. Our vision is to create a global community of learners inspired to innovate and drive positive change.",
  values: [
    "Excellence in Education",
    "Commitment to Accessibility",
    "Innovation in Learning",
    "Integrity and Transparency",
    "Community and Collaboration",
  ],
  organization: [
    "Founded in 2023, Develop with Shiven was born out of a vision to bridge the gap between traditional education and the evolving demands of the tech industry. With a commitment to offering expert-curated IT courses, our platform is designed to equip learners with the practical, in-demand skills they need to succeed in today’s fast-paced digital world. From front-end development to AI-driven solutions, our courses are meticulously crafted by industry professionals who bring real-world expertise to the table.",

    "But we don’t stop at education. Recognizing that businesses, too, need the right tools to thrive in a competitive market, we offer industry-leading services tailored to help companies of all sizes harness the power of technology. Whether it’s web development, mobile app creation, or AI integration, our team of experts works closely with clients to deliver solutions that not only meet but exceed expectations.",

    "To complement our learning and service offerings, Develop with Shiven also provides a wealth of knowledge through our insightful blogs. These articles serve as a resource for both learners and businesses, covering the latest trends, tools, and strategies in the tech world. Our goal is to create a comprehensive ecosystem where learning and innovation go hand in hand, empowering individuals to grow their careers and helping businesses stay ahead of the curve.",

    "At the core of everything we do is a commitment to quality, accessibility, and innovation. Whether you're an aspiring developer looking to master the latest technologies, or a business seeking to leverage tech to drive growth, Develop with Shiven is here to guide, support, and empower you every step of the way.",
  ],
};

export default function About() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Layout>
      <section className="pb-16 pt-28 px-4 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 dark:bg-gray-900 text-gray-800 dark:text-darkKnight-text">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">
            About <span className="text-darkKnight-accent">Us</span>
          </h1>

          {/* Dynamically render the content */}
          {aboutData.organization.map((paragraph, index) => (
            <p key={index} className="text-lg mb-6 leading-relaxed text-center">
              {paragraph}
            </p>
          ))}

          {/* Mission, Vision, Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Mission Section */}
            <motion.div
              className="p-6 bg-white dark:bg-darkKnight-navbarBg rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <Image
                src="/images/mission.png"
                alt="Mission"
                className="mb-4 rounded-lg"
                width={500}
                height={500}
              />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>{aboutData.mission}</p>
            </motion.div>

            {/* Vision Section */}
            <motion.div
              className="p-6 bg-white dark:bg-darkKnight-navbarBg rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <Image
                src="/images/vision.png"
                alt="Vision"
                className="mb-4 rounded-lg"
                width={500}
                height={500}
              />
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>{aboutData.vision}</p>
            </motion.div>

            {/* Values Section */}
            <motion.div
              className="p-6 bg-white dark:bg-darkKnight-navbarBg rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <Image
                src="/images/values.png"
                alt="Values"
                className="mb-4 rounded-lg"
                height={500}
                width={500}
              />
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="list-disc list-inside">
                {aboutData.values.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Top Courses Section */}
          <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 items-center">
            {/* Left Text Content */}
            <motion.div
              className="absolute z-10 md:relative w-full md:col-span-1 p-4 md:p-8 py-2 flex flex-col justify-center bg-darkKnight-secondary bg-opacity-40 rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <p className="text-lg text-gray-800 dark:text-white mb-4">
                At <strong>&ldquo;Develop with Shiven&rdquo;</strong>, we
                understand that taking the first step can often be the hardest.
                That’s why we’ve curated a selection of our most sought-after
                courses to guide you in this journey of skill-building and
                growth.
              </p>
              <p className="text-lg text-gray-800 dark:text-white">
                Whether you&apos;re venturing into new technology or looking to
                deepen your expertise, these courses are designed to offer
                clarity, practical knowledge, and the edge you need to excel.
              </p>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
              className="md:col-span-2 w-full h-96 md:h-full relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <Image
                src="/images/courses.png"
                alt="Top Courses"
                className="rounded-lg object-cover w-full h-full"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </div>

          {/* Services Section */}
          <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 items-center">
            {/* Left Image Section */}
            <motion.div
              className="md:col-span-2 w-full h-96 md:h-full relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <Image
                src="/images/services.png"
                alt="Services"
                className="rounded-lg object-cover w-full h-full"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>

            {/* Right Text Content */}
            <motion.div
              className="absolute z-10 md:relative w-full md:col-span-1 p-4 md:p-8 py-2 flex flex-col justify-center bg-darkKnight-secondary bg-opacity-40 rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <p className="text-lg leading-relaxed text-gray-800 dark:text-white">
                Beyond courses, we understand that each learner and business has
                unique needs. This is why we provide a broad range of tailored
                services that cater to individuals aspiring to grow their
                knowledge and businesses aiming to leverage the power of
                technology. Whether you&apos;re in need of a mentor, web
                development services, or advanced AI solutions, we’re here to
                ensure that your learning experience and business journey are as
                smooth as possible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
