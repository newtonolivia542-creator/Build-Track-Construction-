import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-[#081225] text-white min-h-screen">

      <Navbar />
      <br></br>
      <br></br>
      <br></br>

      {/* Hero Section */}
      <section className="pt-14 pb-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            About BuildTrack
          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-relaxed">
            Modern construction built on transparency,
            communication, and quality craftsmanship.
          </p>

        </div>

      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14 backdrop-blur-md">

          <h2 className="text-4xl font-bold mb-6 text-center">
            Our Mission
          </h2>

          <p className="text-gray-300 leading-relaxed text-lg text-center max-w-4xl mx-auto">
            BuildTrack was created to modernize the construction industry
            by giving customers real-time visibility into their projects.
            We focus on honest communication, professional project
            management, and delivering high-quality results.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mt-14">

            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-orange-500">
                Transparent Updates
              </h3>

              <p className="text-gray-400">
                Clients receive real-time project progress and communication.
              </p>
            </div>

            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-orange-500">
                Professional Management
              </h3>

              <p className="text-gray-400">
                Organized workflows and efficient project execution.
              </p>
            </div>

            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-orange-500">
                Quality Craftsmanship
              </h3>

              <p className="text-gray-400">
                High construction standards with attention to detail.
              </p>
            </div>

            <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-3 text-orange-500">
                Trusted Experts
              </h3>

              <p className="text-gray-400">
                Experienced builders dedicated to customer satisfaction.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="bg-black py-24">

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              150+
            </h2>

            <p className="mt-4 text-gray-400">
              Projects Completed
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              10+
            </h2>

            <p className="mt-4 text-gray-400">
              Years Experience
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              50+
            </h2>

            <p className="mt-4 text-gray-400">
              Team Members
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-orange-500">
              98%
            </h2>

            <p className="mt-4 text-gray-400">
              Client Satisfaction
            </p>
          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}

