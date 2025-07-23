'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: number;
  runtime: number;
  genre: string;
  overview: string;
}

interface WatchlistMovie extends Movie {
  dateAdded: string;
  priority: 'high' | 'medium' | 'low';
}

interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  addToWatchlist: (movie: Movie, priority?: 'high' | 'medium' | 'low') => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  updatePriority: (movieId: string, priority: 'high' | 'medium' | 'low') => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Error loading watchlist from localStorage:', error);
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie, priority: 'high' | 'medium' | 'low' = 'medium') => {
    const watchlistMovie: WatchlistMovie = {
      ...movie,
      dateAdded: new Date().toISOString().split('T')[0],
      priority
    };
    
    setWatchlist(prev => {
      // Check if movie is already in watchlist
      if (prev.some(item => item.id === movie.id)) {
        return prev;
      }
      return [watchlistMovie, ...prev];
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchlist = (movieId: string) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const updatePriority = (movieId: string, priority: 'high' | 'medium' | 'low') => {
    setWatchlist(prev => 
      prev.map(movie => 
        movie.id === movieId 
          ? { ...movie, priority }
          : movie
      )
    );
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      updatePriority,
      clearWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
