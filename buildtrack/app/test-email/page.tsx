"use client";

export default function TestEmailPage() {
  async function sendTestEmail() {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "newtonolivia542@gmail.com",
        subject: "BuildTrack Test",
        reply: "Congratulations! Your BuildTrack email system is working.",
      }),
    });

    const result = await response.json();

    console.log(result);

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <button
        onClick={sendTestEmail}
        className="bg-orange-500 px-8 py-4 rounded-xl text-white font-bold"
      >
        Send Test Email
      </button>
    </div>
  );
}