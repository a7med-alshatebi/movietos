'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Calendar, Clock, Heart, Bookmark, Play } from 'lucide-react';
import PaginationBar from '../../components/PaginationBar';

// Movie details type
type MovieDetail = {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: number;
  runtime: number;
  genre: string;
  director: string;
  cast: string[];
  overview: string;
  budget: number;
  revenue: number;
  tagline: string;
  trailerUrl: string;
};

// Mock data for movie details
const mockMovieDetails: { [key: string]: MovieDetail } = {
  "1": {
    id: 1,
    title: "The Dark Knight",
    poster: "/batman.jpeg",
    backdrop: "/batman.jpeg",
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
  },
  "2": {
    id: 2,
    title: "Inception",
    poster: "/inception.jpeg",        
    backdrop: "/inception.jpeg",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genre: "Action, Sci-Fi, Thriller",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. But his tragic past may doom the project and his team to disaster.",
    budget: 160000000,
    revenue: 836800000,
    tagline: "Your mind is the scene of the crime.",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  "3": {
    id: 3,
    title: "Interstellar",
    poster: "/interstller.jpeg",
    backdrop: "/interstller.jpeg",
    rating: 8.6,
    year: 2014,
    runtime: 169,
    genre: "Adventure, Drama, Sci-Fi",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. As they journey through the cosmos, they encounter challenges that test their resolve and the limits of human understanding.",
    budget: 165000000,
    revenue: 677471339,   
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT0"
  },
  "4": {
    id: 4,
    title: "Pulp Fiction",
    poster: "/pulpfiction.jpeg",
    backdrop: "/pulpfiction.jpeg",
    rating: 8.9,
    year: 1994,
    runtime: 154,
    genre: "Crime, Drama",
    director: "Quentin Tarantino",  
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. Each story is told in a non-linear fashion, creating a complex narrative that explores themes of morality, fate  and the human condition.",
    budget: 8000000,
    revenue: 213928762,
    tagline: "Just because you are a character doesn't mean that you have character.",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4Fq9l"
  },
  "5": {
    id: 5,
    title: "The Matrix",
    poster: "/thematrix.jpeg",
    backdrop: "/thematrix.jpeg",
    rating: 8.7,
    year: 1999,
    runtime: 136,     
    genre: "Action, Sci-Fi",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Ann Moss", "Hugo Weaving"],
    overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix. As he discovers the truth about his world, he must choose between the life he knows and the reality of the Matrix.",
    budget: 63000000,
    revenue: 463517383,
    tagline: "Welcome to the Real World.",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bpI38"
  },
  "6": {
    id: 6,
    title: "Forrest Gump",
    poster: "/forestgump.webp",
    backdrop: "/forestgump.webp",
    rating: 8.8,
    year: 1994,
    runtime: 142,
    genre: "Drama, Romance",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Mykel T. Williamson"],
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    budget: 55000000,
    revenue: 678226554,
    tagline: "Life is like a box of chocolates. You never know what you're gonna get.",
    trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg"
  }
};

export default function MovieDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const movie = mockMovieDetails[id?.toString() || "1"];
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
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
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
      <div className="container mx-auto px-2 sm:px-4 -mt-24 sm:-mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0 mb-6 lg:mb-0 w-48 sm:w-64 md:w-80">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={400}
              height={600}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 break-words">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-base sm:text-xl text-gray-300 italic mb-6">{movie.tagline}</p>
            )}

            {/* Rating and Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
              <div className="flex items-center bg-yellow-600 text-white px-3 py-1 rounded-full mb-2 sm:mb-0">
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
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Overview</h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{movie.overview}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
              <button
                onClick={toggleFavorite}
                className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors ${
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
                className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors ${
                  isInWatchlist 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                <Bookmark className="mr-2" size={20} fill={isInWatchlist ? 'currentColor' : 'none'} />
                {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
              <button className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors">
                <Play className="mr-2" size={20} />
                Watch Trailer
              </button>
            </div>

            {/* Cast and Crew */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Cast</h3>
                <p className="text-gray-300">{movie.cast.join(', ')}</p>
              </div>
            </div>

            {/* Box Office */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Budget</h3>
                <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Revenue</h3>
                <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Bar */}
      <PaginationBar currentId={movie.id} basePath="/movies" />
    </div>
  );
}
