
 "use client";

import { motion } from "framer-motion";
import Link from "next/link";


export default function Hero() {
  return (
    <section id="home" className="relative h-screen bg-black text-white flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Building Trust <br /> Through Transparency
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
        >
          Track every stage of your construction project with live updates,
          photos, videos, and direct communication.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
        
        <div className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-xl">

          <a href="/projects">Projects </a>
        </div>

          <Link
            href="/client-login"
            className="bg-orange-500 hover:bg-orange-600 hover:scale-105 transition duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
          >
            Client Portal
          </Link>

        </motion.div>

      </motion.div>
    </section>
  );
}