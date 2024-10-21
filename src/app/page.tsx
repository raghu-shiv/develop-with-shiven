"use client";

import Layout from "@/components/Layout";
import ClientSessionProvider from "../components/ClientSessionProvider";
import HeroSection from "@/components/HeroSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";

export default function Home() {
  return (
    <ClientSessionProvider>
      <Layout>
        <HeroSection />
        <FeaturedCourses />
        <ServicesSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <CallToActionSection />
      </Layout>
    </ClientSessionProvider>
  );
}
