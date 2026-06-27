"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!name || !email || !projectType || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    setLoading(true);
  
    const { error } = await supabase
      .from("messages")
      .insert([
        {
          name,
          email,
          subject: projectType,
          message,
          is_read: false,
        },
      ]);
  
    setLoading(false);
  
    if (error) {
      alert(error.message);
      return;
    }
  
    alert("Your message has been sent successfully!");
  
    setName("");
    setEmail("");
    setProjectType("");
    setMessage("");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <br></br>
        <br></br>
        <br></br>
        {/* HERO SECTION */}
        <section className="pt-40 pb-20 text-center px-6">
          <h1 className="text-6xl font-bold mb-6">
            Contact BuildTrack
          </h1>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
            Have questions about your project? Need a quote or consultation?
            Our team is ready to help you every step of the way.
          </p>
        </section>

        {/* CONTACT SECTION */}
        <section className="max-w-7xl mx-auto px-6 pb-24">

          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-4xl font-bold mb-8">
                Send Us A Message
              </h2>

              <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Project Type"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none"
              />

              <textarea
                placeholder="Tell us about your project..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none"
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              </form>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* CONTACT CARD */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

                <h2 className="text-3xl font-bold mb-6">
                  Company Information
                </h2>

                <div className="space-y-5 text-zinc-300 text-lg">

                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p>solotechcompany28@gmail.com</p>
                  </div>

                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p>+231886898970</p>
                  </div>

                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p>Monrovia, Liberia</p>
                  </div>

                  <div>
                    <p className="text-white font-semibold">Working Hours</p>
                    <p>Monday - Friday | 8AM - 6PM</p>
                  </div>

                </div>

              </div>

              {/* QUOTE CARD */}
              <div className="bg-orange-500 rounded-3xl p-8 text-black">

                <h2 className="text-3xl font-bold mb-4">
                  Request A Free Quote
                </h2>

                <p className="text-lg mb-6">
                  We provide transparent pricing and quality construction services.
                </p>

                <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-zinc-900 transition">
                  Get Started
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}