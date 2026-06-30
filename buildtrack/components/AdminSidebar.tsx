"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold text-orange-500 mb-10">
        BuildTrack
      </h1>

      <nav className="space-y-3">

        <Link
          href="/admin"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/admin/clients"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          👥 Clients
        </Link>

        <Link
          href="/admin/projects"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          🏗 Projects
        </Link>

        <Link
          href="/admin/updates"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          📸 Updates
        </Link>

        <Link
          href="/admin/messages"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          💬 Messages
        </Link>

        <Link
          href="/admin/documents"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          📄 Documents
        </Link>

        <Link
          href="/admin/settings"
          className="block p-3 rounded-lg hover:bg-zinc-800"
        >
          ⚙ Settings
        </Link>

      </nav>

    </aside>
  );
}