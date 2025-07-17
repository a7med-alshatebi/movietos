'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Star, Calendar, Clock, Filter } from 'lucide-react';

// Mock data for search results
const mockSearchResults = [
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
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Western'
  ];

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockSearchResults.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setLoading(false);
    }, 500);
  };

  const applyFilters = () => {
    let filtered = mockSearchResults;

    if (filters.genre) {
      filtered = filtered.filter(movie => 
        movie.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(movie => 
        movie.year.toString() === filters.year
      );
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(movie => movie.rating >= minRating);
    }

    setSearchResults(filtered);
  };

  const clearFilters = () => {
    setFilters({ genre: '', year: '', rating: '' });
    setSearchResults([]);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Search Movies</h1>
          <p className="text-gray-400">Find your next favorite film</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Filter className="mr-2" size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white mb-2">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Any Rating</option>
                  <option value="7.0">7.0+</option>
                  <option value="8.0">8.0+</option>
                  <option value="9.0">9.0+</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Searching...</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((movie) => (
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
        )}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found for "{searchQuery}"</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Initial State */}
        {!searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">Start typing to search for movies</p>
          </div>
        )}
      </div>
    </div>
  );
}
