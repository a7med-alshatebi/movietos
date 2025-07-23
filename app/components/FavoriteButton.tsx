'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

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

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
  showText?: boolean;
}

export default function FavoriteButton({ movie, className = '', showText = false }: FavoriteButtonProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const movieId = String(movie.id);
  const isMovieFavorite = isFavorite(movieId);

  const handleToggleFavorite = () => {
    if (isMovieFavorite) {
      removeFromFavorites(movieId);
    } else {
      // Convert movie to the expected format with string id
      const favoriteMovie = {
        ...movie,
        id: movieId
      };
      addToFavorites(favoriteMovie);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`flex items-center justify-center transition-colors ${
        isMovieFavorite
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white'
      } ${className}`}
      title={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={isMovieFavorite ? 'fill-current' : ''} 
        size={16} 
      />
      {showText && (
        <span className="ml-2">
          {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}
