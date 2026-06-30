"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingClient, setEditingClient] = useState<any>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "client")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setClients(data || []);
    }

    setLoading(false);
  }

  function openEdit(client: any) {
    setEditingClient(client);

    setFormData({
      full_name: client.full_name || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      status: client.status || "Active",
    });
  }

  async function saveClient() {
    if (!editingClient) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        status: formData.status,
      })
      .eq("id", editingClient.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Client updated successfully!");

    setEditingClient(null);

    loadClients();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white px-8 py-32">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-bold">
                Client Management
              </h1>

              <p className="text-zinc-400 mt-2">
                View and manage all registered clients.
              </p>
            </div>

            <Link
              href="/admin"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition"
            >
              Back to Dashboard
            </Link>
          </div>

          {loading ? (
            <p>Loading clients...</p>
          ) : clients.length === 0 ? (
            <p>No clients found.</p>
          ) : (
            <div className="bg-zinc-900 rounded-2xl overflow-hidden">

              <table className="w-full">

                <thead className="bg-zinc-800">

                  <tr>
                    <th className="text-left p-5">Name</th>
                    <th className="text-left p-5">Email</th>
                    <th className="text-left p-5">Phone</th>
                    <th className="text-left p-5">Status</th>
                    <th className="text-left p-5">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {clients.map((client) => (

                    <tr
                      key={client.id}
                      className="border-t border-zinc-800 hover:bg-zinc-800 transition"
                    >

                      <td className="p-5">
                        {client.full_name || "Not Available"}
                      </td>

                      <td className="p-5">
                        {client.email || "Not Available"}
                      </td>

                      <td className="p-5">
                        {client.phone || "Not Available"}
                      </td>

                      <td
                        className={`p-5 font-semibold ${
                          client.status === "Active"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {client.status}
                      </td>

             <td className="p-5">
                <div className="flex gap-2 flex-wrap">

                 <Link
                    href={`/admin/clients/${client.id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm transition"
                    >
                    👁 View
                 </Link>

                 <button
                    onClick={() => openEdit(client)}
                    className="bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg text-sm transition"
                    >
                    ✏ Edit
                 </button>

                 <button
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm transition"
                    >
                    🏗 Assign
                 </button>

                 <button
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm transition"
                    >
                    💬 Message
                 </button>

                 </div>
                </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}
        </div>
      </main>

      {editingClient && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-lg">

            <h2 className="text-3xl font-bold mb-6">
              Edit Client
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_name: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />

              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />

              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={() => setEditingClient(null)}
                className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={saveClient}
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg transition"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

      <Footer />
    </>
  );
}