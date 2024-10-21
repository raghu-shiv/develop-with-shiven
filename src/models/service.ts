// src/models/service.ts
export interface Service {
  id: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "1",
    title: "Website Designing",
    description: "Stylish web design for modern businesses.",
  },
  {
    id: "2",
    title: "Web Development",
    description: "End-to-end web development for modern businesses.",
  },
  {
    id: "3",
    title: "Mobile App Development",
    description:
      "Creating user-friendly mobile apps for Android and iOS platforms.",
  },
  {
    id: "4",
    title: "E-Commerce Solution",
    description:
      "Tailored e-commerce platforms to help you sell online efficiently.",
  },
  {
    id: "5",
    title: "Search Engine Optimization (SEO)",
    description:
      "Boost your online visibility with our advanced SEO strategies.",
  },
  {
    id: "6",
    title: "Modern Keyword Analysis",
    description:
      "Unlock the potential of keyword research with the latest tools and techniques.",
  },
  {
    id: "7",
    title: "Data Visualization",
    description:
      "Transform your data into actionable insights using Power BI visualizations.",
  },
  {
    id: "8",
    title: "Prompt Engineering",
    description:
      "Craft precise AI prompts to generate targeted, engaging, and personalized content.",
  },
  {
    id: "9",
    title: "AI Tools",
    description:
      "Enhance productivity with generative AI, image generators, and automated solutions.",
  },
];
