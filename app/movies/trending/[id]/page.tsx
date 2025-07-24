"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Calendar, Clock } from "lucide-react";

// Mock data for trending movies (should match the trending list)
const mockTrendingMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    poster: "/avatarthewayofwater.jpeg",
    rating: 7.6,
    year: 2022,
    runtime: 192,
    genre: "Action, Adventure, Drama",
    overview:
      "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
    trending: 1,
    change: "+5",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    poster: "/topgun.jpeg",
    rating: 8.3,
    year: 2022,
    runtime: 130,
    genre: "Action, Drama",
    overview:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    trending: 2,
    change: "+2",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    poster: "/blackpanther.jpeg",
    rating: 6.7,
    year: 2022,
    runtime: 161,
    genre: "Action, Adventure, Drama",
    overview:
      "The people of Wakanda fight to protect their home from intervening world powers.",
    trending: 3,
    change: "-1",
  },
  {
    id: 4,
    title: "The Batman",
    poster: "/batman.jpeg",
    rating: 7.8,
    year: 2022,
    runtime: 176,
    genre: "Action, Crime, Drama",
    overview:
      "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham.",
    trending: 4,
    change: "+3",
  },
  {
    id: 5,
    title: "Doctor Strange in the Multiverse of Madness",
    poster: "/doctorstranger.jpeg",
    rating: 6.9,
    year: 2022,
    runtime: 126,
    genre: "Action, Adventure, Fantasy",
    overview:
      "Doctor Strange teams up with a mysterious young woman who can travel across multiverses.",
    trending: 5,
    change: "0",
  },
  {
    id: 6,
    title: "Minions: The Rise of Gru",
    poster: "/minions.jpeg",
    rating: 6.5,
    year: 2022,
    runtime: 87,
    genre: "Animation, Adventure, Comedy",
    overview:
      "The untold story of one twelve-year-old's dream to become the world's greatest supervillain.",
    trending: 6,
    change: "+1",
  },
];

export default function TrendingMovieDetailPage() {
  const params = useParams();
  const id = params?.id;
  const movie = mockTrendingMovies.find((m) => String(m.id) === String(id));

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-4">Movie Not Found</h1>
        <Link href="/movies/trending" className="text-purple-400 hover:underline">
          Back to Trending
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:mr-8 mb-6 md:mb-0">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
              {movie.title}
              <span className="ml-4 text-2xl">#{movie.trending}</span>
            </h1>
            <div className="flex items-center space-x-6 mb-4">
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
            <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
            <p className="text-gray-300 mb-6 leading-relaxed">{movie.overview}</p>
            <div className="flex space-x-4">
              <Link
                href="/movies/trending"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back to Trending
              </Link>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
