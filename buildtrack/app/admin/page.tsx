"use client";

//import { useState } from "react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
//import { supabase } from "@/lib/supabase";//
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  //=========LOADPROJECT FUNCTION =======//

  async function loadProjects() {
    setLoading(true);
  
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });
  
    if (error) {
      console.error(error);
    } else {
      setProjects(data || []);
    }
  
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
    
    loadMessages();
    //loadClients();
  }, []);
//=======LoadMessage=========//

async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    alert(error.message);
    console.error(error);
  } else {
    setMessages(data || []);
  }
}

//======aloadClients===========//

/*async function loadClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    setClients(data || []);
  }
}*/
async function loadClients() {
  const { data, error } = await supabase
    .from("clients")
    .select("*");

  console.log("Clients data:", data);
  console.log("Clients error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  setClients(data || []);
}
//========DELETE PROJECT FUNCTION ==========//

      async function deleteProject(id: number) {

        console.log("Deleting:", id);
      
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this project?"
        );
      
        if (!confirmDelete) return;
      
        const { data: found, error: findError } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id);
      
        console.log("Found:", found);
        console.log("Find Error:", findError);
      
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", id);
      
        console.log("Delete Error:", error);
      
        if (error) {
          alert(error.message);
          return;
        }
      
        await loadProjects();
      
        alert("Project deleted.");
      }

  //====SAVE EDIT FUNCTION ========//

  async function saveEdit() {
    if (!editingId) return;
  
    const { error } = await supabase
      .from("projects")
      .update({
        title: editTitle,
        location: editLocation,
        description: editDescription,
      })
      .eq("id", editingId);
  
    if (error) {
      console.error(error);
      alert("Failed to update project.");
      return;
    }
  
    alert("Project updated successfully!");
  
    setEditingId(null);
  
    loadProjects();
  }
  
//======UPLOAD PROJECT FUNCTION =======//

function startEdit(project: any) {
  setEditingId(project.id);
  setEditTitle(project.title);
  setEditLocation(project.location);
  setEditDescription(project.description);
}

  async function handleUpload() {

    if (!image) {
      alert("Please select an image");
      return;
    }

    // Create unique file name
    const fileName = `${Date.now()}-${image.name}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError);
      alert("Image upload failed");
      return;
    }

    // Get image public URL
    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // Save project to database
    const { error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          location,
          description,
          image: imageUrl,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Database save failed");
    } else {

      alert("Project uploaded successfully!");
      loadProjects();

      // Reset form
      setTitle("");
      setLocation("");
      setDescription("");
      setImage(null);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-16 text-center px-6">

        <h1 className="text-5xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
          Manage projects, upload images, and monitor construction updates.
        </p>

        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

  <h2 className="text-4xl font-bold mb-8">
    All Projects
  </h2>

  {loading ? (

    <p>Loading projects...</p>

  ) : projects.length === 0 ? (

    <p>No projects found.</p>

  ) : (

    <div className="space-y-6">

      {projects.map((project) => (



        <div
          key={project.id}
          className="flex justify-between items-center bg-black p-5 rounded-xl border border-zinc-800"
        >

          <div className="flex items-center gap-5">

            <img
              src={project.image}
              alt={project.title}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div>

              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              <p className="text-zinc-400">
                {project.location}
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={() => startEdit(project)}
              className="bg-blue-600 px-5 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              //onClick={() => deleteProject(project.id, project.image)}
              onClick={() => deleteProject(project.id)}
              className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>
      ))}
   

    </div>

  )}

</div>

      </section>

      {/* DASHBOARD */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between shadow-2xl">

            <h2 className="text-3xl font-bold">
              Total Projects
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-6">
              {projects.length}
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between shadow-2xl">

            <h2 className="text-3xl font-bold">
              Messages
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-6">
              8
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 min-h-[220px] flex flex-col justify-between shadow-2xl">

            <h2 className="text-3xl font-bold">
              Active Clients
            </h2>

            <p className="text-5xl font-bold text-orange-500 mt-6">
            {clients.length}
            </p>

          </div>

        </div>

{editingId && (
  <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

    <h2 className="text-4xl font-bold mb-8">
      Edit Project
    </h2>

    <div className="space-y-6">

      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
      />

      <input
        type="text"
        value={editLocation}
        onChange={(e) => setEditLocation(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
      />

      <textarea
        rows={5}
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
      />

      <div className="flex gap-4">

        <button
          type="button"
          onClick={saveEdit}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => setEditingId(null)}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}

        {/* ADD PROJECT */}
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-bold mb-8">
            Add New Project
          </h2>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none text-white"
            />

            <input
              type="text"
              placeholder="Project Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none text-white"
            />

            <textarea
              placeholder="Project Description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 focus:outline-none text-white"
            />

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
            />

            <button
              type="button"
              onClick={handleUpload}
              className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Upload Project
            </button>

          </form>

        </div>

      </section>

      <Footer />

    </main>
  );
}