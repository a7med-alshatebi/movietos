'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, Clock } from 'lucide-react';

// Mock data for movies (in a real app, you'd fetch from an API like TMDB)
const mockMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    poster: "/api/placeholder/300/450",
    rating: 9.0,
    year: 2008,
    runtime: 152,
    genre: "Action, Crime, Drama",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 2,
    title: "Inception",
    poster: "/api/placeholder/300/450",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genre: "Action, Sci-Fi, Thriller",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/api/placeholder/300/450",
    rating: 8.6,
    year: 2014,
    runtime: 169,
    genre: "Adventure, Drama, Sci-Fi",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "/api/placeholder/300/450",
    rating: 8.9,
    year: 1994,
    runtime: 154,
    genre: "Crime, Drama",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: 5,
    title: "The Matrix",
    poster: "/api/placeholder/300/450",
    rating: 8.7,
    year: 1999,
    runtime: 136,
    genre: "Action, Sci-Fi",
    overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix."
  },
  {
    id: 6,
    title: "Forrest Gump",
    poster: "/api/placeholder/300/450",
    rating: 8.8,
    year: 1994,
    runtime: 142,
    genre: "Drama, Romance",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
  }
];

export default function MoviesPage() {
  const [movies, setMovies] = useState(mockMovies);
  const [sortBy, setSortBy] = useState('title');

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    const sorted = [...movies].sort((a, b) => {
      switch (criteria) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });
    setMovies(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">All Movies</h1>
          
          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center">
                  <Star className="text-yellow-400 mr-1" size={16} />
                  {movie.rating}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{movie.title}</h3>
                
                <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {movie.year}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {movie.runtime}m
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-3">{movie.genre}</p>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{movie.overview}</p>
                
                <Link
                  href={`/movies/${movie.id}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
