import React from "react";
import Link from "next/link";
import { Film } from "lucide-react";

const genres = [
  { name: "Action", count: 12 },
  { name: "Adventure", count: 8 },
  { name: "Drama", count: 15 },
  { name: "Sci-Fi", count: 7 },
  { name: "Crime", count: 6 },
  { name: "Romance", count: 5 },
  { name: "Comedy", count: 9 },
  { name: "Animation", count: 4 },
  { name: "Fantasy", count: 3 },
];

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Browse by Genre</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              href={`/movies/genres/${genre.name.toLowerCase()}`}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow hover:bg-purple-700 group"
            >
              <Film className="text-purple-400 mb-4 group-hover:text-white" size={40} />
              <span className="text-2xl font-bold text-white mb-2 group-hover:text-white">{genre.name}</span>
              <span className="text-gray-400 text-sm">{genre.count} movies</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
