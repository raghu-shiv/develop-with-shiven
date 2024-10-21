// src/app/services/page.tsx
"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Service } from "../../models/service";
import {
  FaDesktop,
  FaMobileAlt,
  FaShoppingCart,
  FaSearch,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa"; // Import relevant icons

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchServices();
  }, []);

  if (error)
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </Layout>
    );

  // Mapping icons for each service
  const serviceIcons = [
    FaDesktop,
    FaMobileAlt,
    FaShoppingCart,
    FaSearch,
    FaChartLine,
    FaChartPie,
  ];

  return (
    <Layout>
      <section className="pb-16 pt-28 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 text-darkKnight-text">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Our <span className="text-darkKnight-accent">Services</span>
          </h1>
          <p className="text-lg mb-12">
            Discover a wide range of services designed to help you grow your
            business and reach your goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length]; // Select appropriate icon
              return (
                <div
                  key={service.id}
                  className="dark:bg-darkKnight-navbarBg rounded-lg shadow-lg p-8 transition-all transform duration-300 hover:scale-105 hover:bg-darkKnight-accent hover:text-darkKnight-primary"
                >
                  <div className="mb-4">
                    <Icon className="text-4xl text-indigo-600 mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
