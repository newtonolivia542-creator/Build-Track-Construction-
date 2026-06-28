"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 rounded-3xl p-10 w-full max-w-md space-y-6"
      >

        <h1 className="text-4xl font-bold text-white">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-black text-white border border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-black text-white border border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-xl font-semibold"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

    </main>
  );
}