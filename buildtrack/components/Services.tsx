"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Residential Construction",
    description:
      "Modern homes built with quality materials and transparent project tracking.",
  },
  {
    title: "Commercial Projects",
    description:
      "Professional commercial buildings delivered on time and within budget.",
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Transforming spaces with beautiful modern renovations and upgrades.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0F172A] text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold">
            Our Services
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            We provide high-quality construction solutions with transparency,
            communication, and precision.
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-orange-500 hover:-translate-y-2 transition duration-300 backdrop-blur-md"
            >

              <div className="w-16 h-16 rounded-2xl bg-orange-500 mb-6"></div>

              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}