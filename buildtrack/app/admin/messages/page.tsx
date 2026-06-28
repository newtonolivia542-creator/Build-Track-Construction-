"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyOpen, setReplyOpen] = useState(false);
  //const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  async function loadMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setMessages(data || []);
    }

    setLoading(false);
  }
  //OPEN REPLY FUNCTION//
  function openReply(message: any) {
    setSelectedMessage(message);
    setReplyText("");
    setReplyOpen(true);
  }

  {replyOpen && selectedMessage && (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
    
      <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-2xl">
    
        <h2 className="text-3xl font-bold mb-6">
          Reply to {selectedMessage.name}
        </h2>
    
        <p className="mb-3 text-zinc-400">
          To:
        </p>
    
        <div className="bg-black p-3 rounded mb-6">
          {selectedMessage.email}
        </div>
    
        <textarea
          rows={8}
          value={replyText}
          onChange={(e)=>setReplyText(e.target.value)}
          placeholder="Write your reply..."
          className="w-full bg-black border border-zinc-700 rounded-xl p-4"
        />
    
        <div className="flex justify-end gap-4 mt-6">
    
          <button
            onClick={()=>setReplyOpen(false)}
            className="bg-zinc-700 px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
    
          <button
            onClick={sendReply}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
          >
            Send Reply
          </button>
    
        </div>
    
      </div>
    
    </div>
    
    )}

    async function sendReply() {

        if (!selectedMessage) return;
      
        const response = await fetch("/api/send-email", {
      
          method: "POST",
      
          headers: {
            "Content-Type": "application/json",
          },
      
          body: JSON.stringify({
      
            to: selectedMessage.email,
      
            subject: `Re: ${selectedMessage.subject}`,
      
            message: replyText,
      
          }),
      
        });
      
        /*if (response.ok) {
      
          alert("Reply sent!");
      
          setReplyOpen(false);
      
        } else {
      
          alert("Failed to send reply.");
      
        }
      
      }*/
        if (response.ok) {
            alert("Reply sent!");
            setReplyOpen(false);
          } else {
            const error = await response.text();
            console.error(error);
            alert(error);
          }
        }

//delete function//
  async function deleteMessage(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
  
    if (!confirmDelete) return;
  
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);
  
    if (error) {
      alert(error.message);
      console.error(error);
    } else {
      loadMessages();
    }
  }

  //show Messages as Read or Unread//

  async function toggleRead(message: Message) {
    const { error } = await supabase
      .from("messages")
      .update({
        is_read: !message.is_read,
      })
      .eq("id", message.id);
  
    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      loadMessages();
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold mb-3">
            Client Messages
          </h1>

          <p className="text-zinc-400 mb-10">
            View and manage messages sent from your website.
          </p>

          {loading ? (
            <p className="text-center text-zinc-400">
              Loading messages...
            </p>
          ) : messages.length === 0 ? (
            <p className="text-center text-zinc-400">
              No messages found.
            </p>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {msg.name}
                      </h2>

                      <p className="text-zinc-400">
                        {msg.email}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        msg.is_read
                          ? "bg-green-600"
                          : "bg-orange-500"
                      }`}
                    >
                      {msg.is_read ? "Read" : "Unread"}
                    </span>
                  </div>

                  <p>
                    <strong>Phone:</strong> {msg.phone}
                  </p>

                  <p>
                    <strong>Subject:</strong> {msg.subject}
                  </p>

                  <div className="mt-4 bg-black rounded-xl p-4">
                    {msg.message}
                  </div>

                  

                <p className="text-zinc-500 text-sm">
                {new Date(msg.created_at).toLocaleString()}
                </p>

                <div className="flex gap-3">

                <button
                    onClick={() => openReply(msg)}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
                >
                    Reply
                </button> 

                <button
                    onClick={() => toggleRead(msg)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                    msg.is_read
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {msg.is_read ? "Mark Unread" : "Mark Read"}
                </button>

                <button
                    onClick={() => deleteMessage(msg.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
                >
                    Delete
                </button>

                </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>

{replyOpen && selectedMessage && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

    <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-2xl">

      <h2 className="text-3xl font-bold mb-6">
        Reply to {selectedMessage.name}
      </h2>

      <p className="mb-3 text-zinc-400">
        To:
      </p>

      <div className="bg-black p-3 rounded mb-6">
        {selectedMessage.email}
      </div>

      <textarea
        rows={8}
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write your reply..."
        className="w-full bg-black border border-zinc-700 rounded-xl p-4"
      />

      <div className="flex justify-end gap-4 mt-6">

        <button
          onClick={() => setReplyOpen(false)}
          className="bg-zinc-700 px-6 py-3 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={sendReply}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
        >
          Send Reply
        </button>

      </div>

    </div>

  </div>
)}

      <Footer />
      </>
);
  //);
}