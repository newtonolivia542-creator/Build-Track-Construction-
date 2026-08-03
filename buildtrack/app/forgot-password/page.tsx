"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password reset link sent! Please check your email.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleResetPassword}
        className="bg-zinc-900 rounded-3xl p-10 w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-bold text-white">
          Forgot Password
        </h1>

        <p className="text-zinc-400">
          Enter your email address and we'll send you a password reset link.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 rounded-xl bg-black text-white border border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-xl font-semibold"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="text-center text-green-400">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}