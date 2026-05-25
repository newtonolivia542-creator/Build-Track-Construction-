"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  async function handleUpload() {

    if (!image) {
      alert("Please select an image");
      return;
    }

    // Create unique file name
    const fileName = `${Date.now()}-${image.name}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError);
      alert("Image upload failed");
      return;
    }

    // Get image public URL
    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // Save project to database
    const { error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          location,
          description,
          image: imageUrl,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Database save failed");
    } else {

      alert("Project uploaded successfully!");

      // Reset form
      setTitle("");
      setLocation("");
      setDescription("");
      setImage(null);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-16 text-center px-6">

        <h1 className="text-5xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Manage projects, upload images, and monitor construction updates.
        </p>

      </section>

      {/* DASHBOARD */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between shadow-2xl">

            <h2 className="text-3xl font-bold">
              Total Projects
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-6">
              12
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between shadow-2xl">

            <h2 className="text-3xl font-bold">
              Messages
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-6">
              8
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between shadow-2xl">

            <h2 className="text-3xl font-bold">
              Active Clients
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-6">
              5
            </p>

          </div>

        </div>

        {/* ADD PROJECT */}
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-bold mb-8">
            Add New Project
          </h2>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none text-white"
            />

            <input
              type="text"
              placeholder="Project Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none text-white"
            />

            <textarea
              placeholder="Project Description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none text-white"
            />

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
            />

            <button
              type="button"
              onClick={handleUpload}
              className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Upload Project
            </button>

          </form>

        </div>

      </section>

      <Footer />

    </main>
  );
}