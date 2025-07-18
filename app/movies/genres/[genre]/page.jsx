import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Clock } from "lucide-react";

// Mock movies by genre
const moviesByGenre = {
  action: [
    {
      id: 1,
      title: "The Dark Knight",
      poster: "/batman.jpeg",
      rating: 9.0,
      year: 2008,
      runtime: 152,
      genre: "Action, Crime, Drama",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    },
    {
      id: 5,
      title: "The Matrix",
      poster: "/thematrix.jpeg",
      rating: 8.7,
      year: 1999,
      runtime: 136,
      genre: "Action, Sci-Fi",
      overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    },
  ],
  drama: [
    {
      id: 4,
      title: "Forrest Gump",
      poster: "/forestgump.webp",
      rating: 8.8,
      year: 1994,
      runtime: 142,
      genre: "Drama, Romance",
      overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    },
    {
      id: 3,
      title: "Pulp Fiction",
      poster: "/pulpfiction.jpeg",
      rating: 8.9,
      year: 1994,
      runtime: 154,
      genre: "Crime, Drama",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
  ],
  // Add more genres and movies as needed
};

export default function GenreMoviesPage() {
  const params = useParams();
  const genre = params?.genre?.toLowerCase();
  const movies = moviesByGenre[genre] || [];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center capitalize">{genre} Movies</h1>
        {movies.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-16">No movies found for this genre.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center bg-yellow-600 text-white px-3 py-1 rounded-full">
                      <Star className="mr-1" size={16} />
                      {movie.rating}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Calendar size={16} className="mr-1" />
                      {movie.year}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock size={16} className="mr-1" />
                      {movie.runtime} min
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{movie.genre}</p>
                  <p className="text-gray-300 mb-4">{movie.overview}</p>
                  <Link
                    href={`/movies/${movie.id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
