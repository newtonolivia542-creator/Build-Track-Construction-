"use client";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      alert(error.message);
      return;
    }
  
    router.push("/client-dashboard");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-md">

          <h1 className="text-4xl font-bold mb-2 text-center">
            Client Portal
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Sign in to view your construction project.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-xl bg-black border border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-xl bg-black border border-zinc-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold transition"
            >
              Login
            </button>

            

          </form>

          <div className="text-center mt-6">

            <button className="text-orange-400 hover:underline">
              Forgot Password?
            </button>

          <Link
            href="/client-register"
            className="bg-orange-500 hover:bg-orange-300 hover:scale-105 transition duration-200 px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
          >
            Create an account 
          </Link>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}