import Link from "next/link";

type ProjectCardProps = {
    id: number;
    title: string;
    location: string;
    image: string;
    description: string;
  };
  
  export default function ProjectCard({
    id,
    title,
    location,
    image,
    description,
  }: ProjectCardProps) {
    /*return (
      <Link href={`/projects/${id}`}>
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:scale-[1.02] transition duration-300 shadow-2xl cursor-pointer"></div>
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:scale-[1.02] transition duration-300 shadow-2xl">
  
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
        />
  
        <div className="p-6">
  
          <h2 className="text-3xl font-bold mb-2 text-white">
            {title}
          </h2>
  
          <p className="text-orange-400 mb-4">
            {location}
          </p>
  
          <p className="text-zinc-400">
            {description}
          </p>
  
        </div>
  
      </div>*/
    return (
        <Link href={`/projects/${id}`}>
          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:scale-[1.02] transition duration-300 shadow-2xl cursor-pointer">
      
            <img
              src={image}
              alt={title}
              className="w-full aspect-[4/3] object-cover"
            />
      
            <div className="p-6">
      
              <h2 className="text-3xl font-bold mb-2 text-white">
                {title}
              </h2>
      
              <p className="text-orange-400 mb-4">
                {location}
              </p>
      
              <p className="text-zinc-400">
                {description}
              </p>
      
            </div>
      
          </div>
        </Link>
      );
  }