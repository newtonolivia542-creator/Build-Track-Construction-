import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/lib/supabase";

export default async function ProjectsPage() {

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*");

  console.log("PROJECTS:", projects);
  console.log("ERROR:", error);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 pb-24 px-6">

        <section className="text-center mb-20">

          <h1 className="text-7xl font-bold mb-6">
            Featured Projects
          </h1>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
            Explore our ongoing and completed construction projects with transparency and real-time progress updates.
          </p>

        </section>

        <section className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              location={project.location}
              image={project.image}
              description={project.description}
            />
          ))}

        </section>

      </main>

      <Footer />
    </>
  );
}