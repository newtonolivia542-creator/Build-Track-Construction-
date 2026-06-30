"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientProfile() {
  const { id } = useParams();

  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    loadClient();
  }, []);

  async function loadClient() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    setClient(data);
  }

  if (!client) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white flex justify-center items-center">
          Loading client...
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white px-8 py-32">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold mb-10">
            {client.full_name || "Client"}
          </h1>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-zinc-900 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Client Information
              </h2>

              <p><strong>Email:</strong> {client.email || "N/A"}</p>

              <p><strong>Phone:</strong> {client.phone || "N/A"}</p>

              <p><strong>Address:</strong> {client.address || "N/A"}</p>

              <p><strong>Status:</strong> {client.status}</p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <button className="w-full bg-orange-500 py-3 rounded-xl">
                  ✏ Edit Client
                </button>

                <button className="w-full bg-green-600 py-3 rounded-xl">
                  🏗 Assign Project
                </button>

                <button className="w-full bg-purple-600 py-3 rounded-xl">
                  💬 Message Client
                </button>

                <button className="w-full bg-blue-600 py-3 rounded-xl">
                  📄 Documents
                </button>

                <button className="w-full bg-yellow-600 py-3 rounded-xl">
                  💳 Payments
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}