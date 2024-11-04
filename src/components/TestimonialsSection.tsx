import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jaehyuk L.",
    content:
      "Really appreciated the succinct explanations of the underlying concepts",
  },
  {
    name: "Arbo Z.",
    content:
      "So far so good - seems to be providing me exactly with the skills I have been looking to develop",
  },
  {
    name: "Penelope M.",
    content: "Great graphics, great content, great explanations",
  },
  {
    name: "James S.",
    content:
      "This is my first time taking a course in express.js and I am very happy with how it is going because I thought it was going to be dense. However, I am understanding the content as it is clearly explained and sets me up for success.",
  },
  {
    name: "Chiara R.",
    content: "great tutorials",
  },
];

export default function TestimonialsSection() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideVariants = {
    animate: {
      x: ["0%", "-100%"], // Move from 0% to -100% of the container width
      transition: {
        x: {
          repeat: Infinity, // Infinite loop
          repeatType: "loop", // Loop back to the start
          duration: 40, // Slow motion effect (increase for slower speed)
          ease: "linear", // Smooth constant motion
        },
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-700 to-gray-800">
      <div className="container mx-auto text-center overflow-hidden">
        <motion.h2
          className="text-white text-4xl font-bold mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
        >
          Kind Words from{" "}
          <span className="text-darkKnight-accent">Our Community</span>
        </motion.h2>

        <motion.div
          className="flex gap-8"
          variants={slideVariants}
          animate="animate"
          style={{ whiteSpace: "nowrap" }} // Ensure items stay in a row
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[300px] p-6 bg-darkKnight-navbarBg rounded-lg shadow-lg"
              style={{ flex: "none" }} // Prevent item shrinkage
            >
              <p className="text-darkKnight-text mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <p className="text-darkKnight-text">- {testimonial.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
