"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ClientDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/client-login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-2">
        Client Dashboard
      </h1>

      <p className="text-zinc-400 mb-10">
        Welcome back {profile?.full_name || "Client"} 👋
      </p>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Profile */}

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            My Profile
          </h2>

          <p className="mb-3">
            <strong>Name:</strong> {profile?.full_name || "Not Available"}
          </p>

          <p className="mb-3">
            <strong>Role:</strong> {profile?.role || "Client"}
          </p>

          <p className="mb-3">
            <strong>Phone:</strong> {profile?.phone || "Not Available"}
          </p>

          <p>
            <strong>Address:</strong> {profile?.address || "Not Available"}
          </p>

        </div>

        {/* Current Project */}

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            🏗 Current Project
          </h2>

          <p className="mb-3">
            <strong>Project:</strong> Modern Family House
          </p>

          <p className="mb-5">
            <strong>Status:</strong> Foundation Completed
          </p>

          <p className="mb-2 font-semibold">
            Progress
          </p>

          <div className="w-full h-5 bg-zinc-700 rounded-full overflow-hidden">

            <div className="h-full bg-orange-500 w-3/5"></div>

          </div>

          <p className="mt-2 text-zinc-400">
            60% Complete
          </p>

        </div>

        {/* Recent Updates */}

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            📸 Recent Updates
          </h2>

          <ul className="space-y-3">
            <li>✔ Foundation Completed</li>
            <li>✔ Walls Installed</li>
            <li>✔ Roofing Started</li>
          </ul>

        </div>

        {/* Messages */}

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            💬 Messages
          </h2>

          <p>You currently have no unread messages.</p>

          <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg">
            Open Messages
          </button>

        </div>

        {/* Payments */}

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            💵 Payments
          </h2>

          <p className="mb-2">
            Paid: <strong>$15,000</strong>
          </p>

          <p>
            Remaining: <strong>$8,500</strong>
          </p>

        </div>

        {/* Documents */}

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            📄 Documents
          </h2>

          <div className="flex flex-wrap gap-3">

            <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">
              Contract
            </button>

            <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">
              Invoice
            </button>

            <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg">
              Warranty
            </button>

          </div>

        </div>

      </div>

      <button
        onClick={logout}
        className="mt-10 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
      >
        Logout
      </button>

    </main>
  );
}