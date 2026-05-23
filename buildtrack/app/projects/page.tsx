import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {

  const projects = [
    {
      title: "Luxury Bedroom Remodel",
      location: "Sioux City, Iowa",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      description:
        "Modern luxury bedroom renovation with premium interior finishing.",
    },

    {
      title: "Modern Kitchen Upgrade",
      location: "Omaha, Nebraska",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
      description:
        "Complete kitchen redesign with custom cabinets and lighting.",
    },

    {
      title: "Commercial Office Space",
      location: "Des Moines, Iowa",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      description:
        "Large-scale office construction with modern architecture.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white pt-40 pb-24 px-6">

        <section className="text-center mb-20">

          <h1 className="text-7xl font-bold mb-6">
            Featured Projects
          </h1>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto">
            Explore our ongoing and completed construction projects with
            transparency and real-time progress updates.
          </p>

        </section>

        <section className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <ProjectCard
              key={index}
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