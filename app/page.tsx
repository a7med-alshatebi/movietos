import Link from "next/link";
import { Search, Film, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Movie<span className="text-purple-400">Discovery</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover amazing movies, explore trending films, and find your next favorite watch
          </p>
          <Link
            href="/movies"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            <Search className="mr-2" size={20} />
            Start Exploring
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Trending Movies</h3>
            </div>
            <p className="text-gray-300">
              Discover the latest trending movies and what&apos;s popular right now
            </p>
            <Link
              href="/movies/trending"
              className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium"
            >
              View Trending →
            </Link>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <Film className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Browse by Genre</h3>
            </div>
            <p className="text-gray-300">
              Explore movies by your favorite genres and discover new categories
            </p>
            <Link
              href="/movies/genres"
              className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium"
            >
              Browse Genres →
            </Link>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <Star className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-semibold text-white">Top Rated</h3>
            </div>
            <p className="text-gray-300">
              Check out the highest-rated movies of all time and critics&apos; favorites
            </p>
            <Link
              href="/movies/top-rated"
              className="inline-block mt-4 text-purple-400 hover:text-purple-300 font-medium"
            >
              View Top Rated →
            </Link>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Quick Navigation</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/movies"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              All Movies
            </Link>
            <Link
              href="/movies/search"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Search Movies
            </Link>
            <Link
              href="/favorites"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              My Favorites
            </Link>
            <Link
              href="/watchlist"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Watch Later
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
