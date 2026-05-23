export default function Footer() {
    return (
      <footer className="bg-black text-white py-10 border-t border-white/10">
  
        <div className="max-w-7xl mx-auto px-6 text-center">
  
          <h2 className="text-3xl font-bold mb-4">
            BuildTrack
          </h2>
  
          <p className="text-gray-400 mb-6">
            Building quality projects with transparency and trust.
          </p>
  
          <div className="flex justify-center gap-6 text-gray-300">
            <a href="#">Home</a>
            <a href="#">Projects</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </div>
  
          <p className="mt-8 text-gray-500 text-sm">
            © 2026 BuildTrack. All rights reserved.
          </p>
  
        </div>
      </footer>
    );
  }