'use client';

import { Bookmark } from 'lucide-react';
import { useWatchlist } from '../contexts/WatchlistContext';

interface Movie {
  id: string | number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  runtime: number;
  genre: string;
  overview: string;
}

interface WatchlistButtonProps {
  movie: Movie;
  className?: string;
  showText?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export default function WatchlistButton({ 
  movie, 
  className = '', 
  showText = false, 
  priority = 'medium' 
}: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const movieId = String(movie.id);
  const isMovieInWatchlist = isInWatchlist(movieId);

  const handleToggleWatchlist = () => {
    if (isMovieInWatchlist) {
      removeFromWatchlist(movieId);
    } else {
      // Convert movie to the expected format with string id
      const watchlistMovie = {
        ...movie,
        id: movieId
      };
      addToWatchlist(watchlistMovie, priority);
    }
  };

  return (
    <button
      onClick={handleToggleWatchlist}
      className={`flex items-center justify-center transition-colors ${
        isMovieInWatchlist
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white'
      } ${className}`}
      title={isMovieInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <Bookmark 
        className={isMovieInWatchlist ? 'fill-current' : ''} 
        size={16} 
      />
      {showText && (
        <span className="ml-2">
          {isMovieInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </span>
      )}
    </button>
  );
}
