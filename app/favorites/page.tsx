'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Calendar, Clock, Trash2 } from 'lucide-react';

// Mock data for favorite movies
const mockFavoriteMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    poster: "/batman.jpeg",
    rating: 9.0,
    year: 2008,
    runtime: 152,
    genre: "Action, Crime, Drama",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    title: "Inception",
    poster: "/inception.jpeg",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genre: "Action, Sci-Fi, Thriller",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    dateAdded: "2024-01-10"
  },
  {
    id: 3,
    title: "Interstellar",
    poster: "/interstller.jpeg",
    rating: 8.6,
    year: 2014,
    runtime: 169,
    genre: "Adventure, Drama, Sci-Fi",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    dateAdded: "2024-01-05"
  }
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavoriteMovies);
  const [sortBy, setSortBy] = useState('dateAdded');

  const handleRemoveFromFavorites = (movieId: number) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    const sorted = [...favorites].sort((a, b) => {
      switch (criteria) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'dateAdded':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });
    setFavorites(sorted);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all movies from your favorites?')) {
      setFavorites([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center md:justify-start">
              <Heart className="mr-3 text-red-500" size={40} />
              My Favorites
            </h1>
            <p className="text-gray-400">
              {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in your favorites
            </p>
          </div>

          {/* Controls */}
          {favorites.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="dateAdded">Date Added</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
                <option value="year">Year</option>
              </select>

              <button
                onClick={clearAllFavorites}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Trash2 className="mr-2" size={16} />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-20">
            <Heart className="mx-auto text-gray-600 mb-6" size={80} />
            <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start exploring movies and add them to your favorites to see them here.
            </p>
            <Link
              href="/movies"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Explore Movies
            </Link>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    {movie.rating}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromFavorites(movie.id)}
                    className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from favorites"
                  >
                    <Heart className="fill-current" size={16} />
                  </button>
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
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/movies/${movie.id}`}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                    <span className="text-gray-500 text-xs">
                      Added {formatDate(movie.dateAdded)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {favorites.length > 0 && (
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Your Favorites Stats</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{favorites.length}</div>
                <h4 className="text-lg font-semibold text-white mb-1">Total Movies</h4>
                <p className="text-gray-400">In your favorites</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {favorites.length > 0 ? (favorites.reduce((sum, movie) => sum + movie.rating, 0) / favorites.length).toFixed(1) : '0'}
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Average Rating</h4>
                <p className="text-gray-400">Of your favorites</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {favorites.length > 0 ? Math.round(favorites.reduce((sum, movie) => sum + movie.runtime, 0) / 60) : '0'}h
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Total Runtime</h4>
                <p className="text-gray-400">Hours of content</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
