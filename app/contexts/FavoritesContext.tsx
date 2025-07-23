'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  runtime: number;
  genre: string;
  overview: string;
  dateAdded?: string;
}

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    const movieWithDate = {
      ...movie,
      dateAdded: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };
    
    setFavorites(prev => {
      // Check if movie is already in favorites
      if (prev.find(fav => fav.id === movie.id)) {
        return prev;
      }
      return [movieWithDate, ...prev];
    });
  };

  const removeFromFavorites = (movieId: string) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId: string) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
