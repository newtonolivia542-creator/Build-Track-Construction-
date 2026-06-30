"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientRegister() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!fullName || !phone || !address || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Create the authentication account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) {
      alert("Registration failed.");
      return;
    }

    // Update the profile row created by the trigger
  /*const { error: profileError } = await supabase
    .from("profiles")
    .upsert({
      id: data.user.id,
      full_name: fullName,
      phone,
      address,
      role: "client",
    });
  
  if (profileError) {
    alert(profileError.message);
    return;
  }*/
 
 // Wait for the trigger to create the profile
await new Promise((resolve) => setTimeout(resolve, 1000));

const { error: profileError } = await supabase
  .from("profiles")
  .update({
    full_name: fullName,
    phone,
    address,
  })
  .eq("id", data.user.id);

if (profileError) {
  alert(profileError.message);
  return;
}*/

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
            id: data.user.id,
            full_name: fullName,
            email,
            phone,
            address,
            role: "client",
            status: "Active",
        });

      if (profileError) {
        alert(profileError.message);
        return;
        }

    alert("Account created! Please check your email to verify your account.");

    // Optional: clear the form
    setFullName("");
    setPhone("");
    setAddress("");
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex justify-center items-center px-6">
        <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-lg">
          <h1 className="text-4xl font-bold text-center mb-2">
            Client Registration
          </h1>

          <p className="text-center text-zinc-400 mb-8">
            Create your BuildTrack account.
          </p>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black"
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded-lg bg-black"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-lg font-semibold"
          >
            Create Account
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}