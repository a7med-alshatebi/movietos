import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Clock } from "lucide-react";
import FavoriteButton from "../../components/FavoriteButton";
import WatchlistButton from "../../components/WatchlistButton";

const topRatedMovies = [
  {
    id: "inception",
    title: "Inception",
    poster: "/inception.jpeg",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genre: "Action, Sci-Fi, Thriller",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "goodfellas",
    title: "Goodfellas",
    poster: "/goodfelas.jpeg",
    rating: 8.7,
    year: 1990,
    runtime: 146,
    genre: "Biography, Crime, Drama",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "/interstller.jpeg",
    rating: 8.6,
    year: 2014,
    runtime: 169,
    genre: "Adventure, Drama, Sci-Fi",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

export default function TopRatedPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Top Rated Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topRatedMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-64 object-cover"
                />
              </div>
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
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <FavoriteButton 
                      movie={movie} 
                      className="flex-1 px-3 py-2 rounded-lg text-sm"
                      showText={true}
                    />
                    <WatchlistButton 
                      movie={movie} 
                      className="flex-1 px-3 py-2 rounded-lg text-sm"
                      showText={true}
                    />
                  </div>
                  <Link
                    href={`/movies/${movie.id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
