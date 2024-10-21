import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCertificate,
  FaPaintBrush,
  FaCode,
  FaShoppingCart,
  FaMobileAlt,
  FaChartBar,
  FaRobot,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";

const servicesData = [
  {
    icon: FaUserGraduate,
    title: "Personalized Learning Paths",
    description:
      "Get tailored course recommendations to match your career goals.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Expert Mentorship",
    description:
      "Connect with industry leaders to guide you through your learning journey.",
  },
  {
    icon: FaCertificate,
    title: "Certification Programs",
    description:
      "Earn certificates to showcase your skills and boost your resume.",
  },
  {
    icon: FaPaintBrush,
    title: "Web Designing",
    description:
      "Craft modern and responsive web designs tailored to your needs.",
  },
  {
    icon: FaCode,
    title: "Web Development",
    description:
      "Build high-performance, scalable web applications for any platform.",
  },
  {
    icon: FaShoppingCart,
    title: "E-Commerce Solution",
    description:
      "Create fully functional e-commerce platforms with secure payment systems.",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile App Development",
    description:
      "Design and develop mobile apps for both iOS and Android platforms.",
  },
  {
    icon: FaChartBar,
    title: "Data Visualization",
    description:
      "Visualize complex data with beautiful, interactive dashboards.",
  },
  {
    icon: FaRobot,
    title: "Artificial Intelligence",
    description:
      "Integrate AI solutions into your business for automation and insights.",
  },
  {
    icon: FaSearch,
    title: "Search Engine Optimization",
    description: "Improve your website's ranking with advanced SEO strategies.",
  },
];

export default function ServicesSection() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-700 to-gray-800">
      <div className="container mx-auto">
        <motion.h2
          className="text-white text-4xl font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
        >
          Our <span className="text-darkKnight-accent">Services</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInVariants}
            >
              <service.icon
                size={50}
                className="mx-auto text-darkKnight-accent mb-4"
              />
              <h3 className="text-darkKnight-text text-xl font-bold mb-2">
                {service.title}
              </h3>
              <p className="text-darkKnight-text">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
