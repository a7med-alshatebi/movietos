'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Star, Calendar, Clock, Check, X } from 'lucide-react';
import { useWatchlist } from '../contexts/WatchlistContext';

// Mapping numeric IDs to slugs for proper navigation
const idToSlugMap: { [key: number]: string } = {
  1: "the-dark-knight",
  2: "inception", 
  3: "interstellar",
  4: "pulp-fiction",
  5: "the-matrix",
  6: "forrest-gump",
  7: "top-gun-maverick",
  8: "black-panther",
  9: "avatar-the-way-of-water",
  10: "goodfellas",
  11: "doctor-strange",
  12: "minions",
  13: "titanic",
  14: "the-godfather",
  15: "avengers-endgame",
  16: "jurassic-park",
  17: "spider-man-no-way-home",
  18: "the-lion-king",
  19: "deadpool",
  20: "frozen",
  21: "the-fast-and-the-furious",
  22: "wonder-woman",
  23: "john-wick",
  24: "the-shawshank-redemption",
  25: "star-wars-a-new-hope",
  26: "guardians-of-the-galaxy",
  27: "mad-max-fury-road"
};

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, updatePriority, clearWatchlist } = useWatchlist();
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');

  const handleRemoveFromWatchlist = (movieId: string) => {
    removeFromWatchlist(movieId);
  };

  const handleMarkAsWatched = (movieId: string) => {
    if (window.confirm('Mark this movie as watched and remove from watchlist?')) {
      handleRemoveFromWatchlist(movieId);
    }
  };

  const handlePriorityChange = (movieId: string, newPriority: 'high' | 'medium' | 'low') => {
    updatePriority(movieId, newPriority);
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    // Note: In the context version, we would need to add sorting to the context
    // For now, sorting will be handled by the display logic
  };

  const getFilteredMovies = () => {
    const filtered = filterBy === 'all' ? watchlist : watchlist.filter(movie => movie.priority === filterBy);
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'priority':
          const priorityOrder: { [key: string]: number } = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dateAdded':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });
    
    return sorted;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  // Helper function to get the correct movie URL
  const getMovieUrl = (movieId: string) => {
    const numericId = parseInt(movieId);
    const slug = idToSlugMap[numericId];
    return slug ? `/movies/${slug}` : `/movies/${movieId}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const clearAllWatchlist = () => {
    if (window.confirm('Are you sure you want to remove all movies from your watchlist?')) {
      clearWatchlist();
    }
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center md:justify-start">
              <Bookmark className="mr-3 text-blue-500" size={40} />
              My Watchlist
            </h1>
            <p className="text-gray-400">
              {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} to watch
            </p>
          </div>

          {/* Controls */}
          {watchlist.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="dateAdded">Date Added</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
                <option value="year">Year</option>
              </select>

              <button
                onClick={clearAllWatchlist}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <X className="mr-2" size={16} />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {watchlist.length === 0 && (
          <div className="text-center py-20">
            <Bookmark className="mx-auto text-gray-600 mb-6" size={80} />
            <h2 className="text-2xl font-bold text-white mb-4">Your watchlist is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Add movies to your watchlist to keep track of what you want to watch next.
            </p>
            <Link
              href="/movies"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Explore Movies
            </Link>
          </div>
        )}

        {/* Watchlist Grid */}
        {filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
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

                  {/* Priority Badge */}
                  <div className={`absolute top-2 left-2 text-white px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(movie.priority)}`}>
                    {movie.priority.toUpperCase()}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleMarkAsWatched(movie.id)}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full flex-1 flex items-center justify-center"
                      title="Mark as watched"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleRemoveFromWatchlist(movie.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full flex-1 flex items-center justify-center"
                      title="Remove from watchlist"
                    >
                      <X size={16} />
                    </button>
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
                  
                  {/* Priority Selector */}
                  <div className="mb-4">
                    <select
                      value={movie.priority}
                      onChange={(e) => handlePriorityChange(movie.id, e.target.value as 'high' | 'medium' | 'low')}
                      className="bg-gray-700 text-white px-3 py-1 rounded text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={getMovieUrl(movie.id)}
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

        {/* No Results for Filter */}
        {watchlist.length > 0 && filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No movies found for the selected priority level.</p>
          </div>
        )}

        {/* Stats */}
        {watchlist.length > 0 && (
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Your Watchlist Stats</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{watchlist.length}</div>
                <h4 className="text-lg font-semibold text-white mb-1">Total Movies</h4>
                <p className="text-gray-400">In your watchlist</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {watchlist.filter(m => m.priority === 'high').length}
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">High Priority</h4>
                <p className="text-gray-400">Must watch soon</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {watchlist.length > 0 ? (watchlist.reduce((sum, movie) => sum + movie.rating, 0) / watchlist.length).toFixed(1) : '0'}
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Average Rating</h4>
                <p className="text-gray-400">Expected quality</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {watchlist.length > 0 ? Math.round(watchlist.reduce((sum, movie) => sum + movie.runtime, 0) / 60) : '0'}h
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Total Runtime</h4>
                <p className="text-gray-400">Hours to watch</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
