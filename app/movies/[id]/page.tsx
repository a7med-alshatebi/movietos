'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Calendar, Clock, Heart, Bookmark, Play } from 'lucide-react';
import { useParams } from 'next/navigation';

// Mock data for movie details
const mockMovieDetails = {
  1: {
    id: 1,
    title: "The Dark Knight",
    poster: "/api/placeholder/400/600",
    backdrop: "/api/placeholder/1200/675",
    rating: 9.0,
    year: 2008,
    runtime: 152,
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets.",
    budget: 185000000,
    revenue: 1004558444,
    tagline: "Welcome to a world without rules.",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  }
};

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.id as string;
  const [movie, setMovie] = useState(mockMovieDetails[1]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Backdrop */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={400}
              height={600}
              className="w-80 h-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="text-xl text-gray-300 italic mb-6">{movie.tagline}</p>
            )}

            {/* Rating and Info */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center bg-yellow-600 text-white px-3 py-1 rounded-full">
                <Star className="mr-1" size={20} />
                <span className="font-semibold">{movie.rating}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar size={20} className="mr-1" />
                {movie.year}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock size={20} className="mr-1" />
                {movie.runtime} min
              </div>
            </div>

            {/* Genre */}
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Genre</p>
              <p className="text-white text-lg">{movie.genre}</p>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={toggleFavorite}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Heart className="mr-2" size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              
              <button
                onClick={toggleWatchlist}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                  isInWatchlist 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Bookmark className="mr-2" size={20} fill={isInWatchlist ? 'currentColor' : 'none'} />
                {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
              
              <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                <Play className="mr-2" size={20} />
                Watch Trailer
              </button>
            </div>

            {/* Cast and Crew */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
                <p className="text-gray-300">{movie.cast.join(', ')}</p>
              </div>
            </div>

            {/* Box Office */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Budget</h3>
                <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Revenue</h3>
                <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
