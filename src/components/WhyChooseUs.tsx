import { motion } from "framer-motion";
import {
  FaAward,
  FaChalkboardTeacher,
  FaDollarSign,
  FaCogs,
  FaBlog,
} from "react-icons/fa";

// Dynamic service data array
const services = [
  {
    icon: FaAward,
    title: "Expert-Curated Courses",
    description:
      "Learn from top professionals in the industry with expertly curated content.",
    iconColor: "text-yellow-400",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Flexible Learning",
    description: "Access courses at your own pace, anytime and anywhere.",
    iconColor: "text-blue-400",
  },
  {
    icon: FaDollarSign,
    title: "Affordable Pricing",
    description: "Get premium content at an affordable price.",
    iconColor: "text-green-400",
  },
  {
    icon: FaCogs,
    title: "Our IT Services",
    description:
      "We offer a vast range of IT services, from web development to AI solutions, tailored to meet the needs of businesses of all sizes.",
    iconColor: "text-purple-400",
  },
  {
    icon: FaBlog,
    title: "Read Our Blog",
    description:
      "Stay updated with the latest trends in the IT industry. Our blog covers insightful articles to help you navigate the world of technology.",
    iconColor: "text-red-400",
  },
];

export default function WhyChooseUs() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-700">
      <div className="container mx-auto text-center">
        {/* Main Heading */}
        <motion.h2
          className="text-white text-4xl font-extrabold mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
        >
          Why Choose{" "}
          <span className="text-darkKnight-accent">Develop with Shiven?</span>
        </motion.h2>

        {/* Dynamic Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white font-bold px-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 bg-darkKnight-navbarBg rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <service.icon
                size={40}
                className={`${service.iconColor} mx-auto mb-4`}
              />
              <h3 className="text-xl mb-2">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
