"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientDetailsPage() {
  const { id } = useParams();

  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  async function loadClient() {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
    } else {
      setClient(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading client...
        </main>
        <Footer />
      </>
    );
  }

  if (!client) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold">
            Client Not Found
          </h1>

          <Link
            href="/admin/clients"
            className="bg-orange-500 px-6 py-3 rounded-xl"
          >
            Back to Clients
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white px-8 py-32">

        <div className="max-w-7xl mx-auto">

          <Link
            href="/admin/clients"
            className="text-orange-400 hover:text-orange-300"
          >
            ← Back to Clients
          </Link>

          <div className="mt-8 bg-zinc-900 rounded-2xl p-8">

            <div className="flex justify-between items-center">

              <div>

                <h1 className="text-5xl font-bold">
                  {client.full_name || "No Name"}
                </h1>

                <p className="text-zinc-400 mt-2">
                  Client Profile
                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  client.status === "Active"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {client.status}
              </span>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <div className="bg-zinc-900 rounded-2xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Client Information
              </h2>

              <div className="space-y-4">

                <div>
                  <p className="text-zinc-400">Full Name</p>
                  <p>{client.full_name || "Not Available"}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Email</p>
                  <p>{client.email || "Not Available"}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Phone</p>
                  <p>{client.phone || "Not Available"}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Address</p>
                  <p>{client.address || "Not Available"}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Role</p>
                  <p>{client.role}</p>
                </div>

                <div>
                  <p className="text-zinc-400">Joined</p>
                  <p>
                    {new Date(client.created_at).toLocaleDateString()}
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Quick Actions
              </h2>

              <div className="grid gap-4">

                <button className="bg-orange-500 hover:bg-orange-600 p-4 rounded-xl">
                  ✏ Edit Information
                </button>

                <button className="bg-green-600 hover:bg-green-700 p-4 rounded-xl">
                  🏗 Assign Project
                </button>

                <button className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl">
                  💬 Message Client
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 p-4 rounded-xl">
                  📄 Documents
                </button>

                <button className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-xl text-black font-semibold">
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