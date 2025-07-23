'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Calendar, Clock, Heart, Bookmark, Play } from 'lucide-react';
import PaginationBar from '../../components/PaginationBar';
import FavoriteButton from '../../components/FavoriteButton';
import WatchlistButton from '../../components/WatchlistButton';

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
  "the-dark-knight": {
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
  "inception": {
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
  "interstellar": {
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
  "pulp-fiction": {
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
  "the-matrix": {
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
  "forrest-gump": {
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
  },
  "top-gun-maverick": {
    id: 7,
    title: "Top Gun: Maverick",
    poster: "/topgun.jpeg",
    backdrop: "/topgun.jpeg",
    rating: 8.3,
    year: 2022,
    runtime: 130,
    genre: "Action, Drama",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
    overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
    budget: 170000000,
    revenue: 1488732821,
    tagline: "Feel the need... The need for speed.",
    trailerUrl: "https://www.youtube.com/watch?v=qSqVVswa420"
  },
  "black-panther": {
    id: 8,
    title: "Black Panther",
    poster: "/blackpanther.jpeg",
    backdrop: "/blackpanther.jpeg",
    rating: 7.3,
    year: 2018,
    runtime: 134,
    genre: "Action, Adventure, Sci-Fi",
    director: "Ryan Coogler",
    cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o", "Danai Gurira"],
    overview: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    budget: 200000000,
    revenue: 1346913161,
    tagline: "Long live the king.",
    trailerUrl: "https://www.youtube.com/watch?v=xjDjIWPwcPU"
  },
  "avatar-the-way-of-water": {
    id: 9,
    title: "Avatar: The Way of Water",
    poster: "/avatarthewayofwater.jpeg",
    backdrop: "/avatarthewayofwater.jpeg",
    rating: 7.6,
    year: 2022,
    runtime: 192,
    genre: "Action, Adventure, Fantasy",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
    overview: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
    budget: 460000000,
    revenue: 2320250281,
    tagline: "Return to Pandora.",
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0"
  },
  "goodfellas": {
    id: 10,
    title: "Goodfellas",
    poster: "/goodfelas.jpeg",
    backdrop: "/goodfelas.jpeg",
    rating: 8.7,
    year: 1990,
    runtime: 146,
    genre: "Biography, Crime, Drama",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci", "Lorraine Bracco"],
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    budget: 25000000,
    revenue: 46836394,
    tagline: "Three Decades of Life in the Mafia.",
    trailerUrl: "https://www.youtube.com/watch?v=qo5jJpHtI2Y"
  },
  "doctor-strange": {
    id: 11,
    title: "Doctor Strange",
    poster: "/doctorstranger.jpeg",
    backdrop: "/doctorstranger.jpeg",
    rating: 7.5,
    year: 2016,
    runtime: 115,
    genre: "Action, Adventure, Fantasy",
    director: "Scott Derrickson",
    cast: ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams", "Benedict Wong"],
    overview: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
    budget: 165000000,
    revenue: 677796076,
    tagline: "Open your mind. Change your reality.",
    trailerUrl: "https://www.youtube.com/watch?v=HSzx-zryEgM"
  },
  "minions": {
    id: 12,
    title: "Minions",
    poster: "/minions.jpeg",
    backdrop: "/minions.jpeg",
    rating: 6.4,
    year: 2015,
    runtime: 91,
    genre: "Animation, Adventure, Comedy",
    director: "Kyle Balda, Pierre Coffin",
    cast: ["Sandra Bullock", "Jon Hamm", "Michael Keaton", "Allison Janney"],
    overview: "Minions Stuart, Kevin, and Bob are recruited by Scarlet Overkill, a supervillain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
    budget: 74000000,
    revenue: 1159444662,
    tagline: "Before Gru, they had a history of bad bosses.",
    trailerUrl: "https://www.youtube.com/watch?v=eisKxhjBnZ0"
  }
};

// Mapping numeric IDs to slugs for pagination
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
  12: "minions"
};

export default function MovieDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const movie = mockMovieDetails[id?.toString() || "the-dark-knight"];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
              <FavoriteButton 
                movie={movie} 
                className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors"
                showText={true}
              />
              <WatchlistButton 
                movie={movie} 
                className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors"
                showText={true}
              />
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
      <PaginationBar 
        currentId={movie.id} 
        basePath="/movies" 
        totalPages={12}
        idToSlugMap={idToSlugMap}
      />
    </div>
  );
}
