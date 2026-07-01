import Link from "next/link";
export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
  
          {/* Logo */}
          <h1 className="text-2xl font-bold text-white">
            BuildTrack
          </h1>
  
          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 text-white font-medium">
            <a href="/">Home</a>
            <a href="/projects">Projects</a>
            <a href="/services">Services</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>        
          </div>
  
          {/* Button */}
          
          <Link
            href="/client-login"
            className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full text-white font-semibold"
          >
            Client Portal
          </Link>
          <Link
            href="/admin"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-white font-semibold transition"
          >
            Admin Login
          </Link>
  
        </div>

      </nav>
    );
  }