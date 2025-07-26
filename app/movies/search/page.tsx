'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Star, Calendar, Clock, Filter } from 'lucide-react';
import FavoriteButton from '../../components/FavoriteButton';
import WatchlistButton from '../../components/WatchlistButton';

// Define the Movie type
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

// Mock data for search results
const mockSearchResults: Movie[] = [
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    poster: "/batman.jpeg",
    rating: 9.0,
    year: 2008,
    runtime: 152,
    genre: "Action, Crime, Drama",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: "inception",
    title: "Inception",
    poster: "/inception.jpeg",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genre: "Action, Sci-Fi, Thriller",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "/interstller.jpeg",
    rating: 8.6,
    year: 2014,
    runtime: 169,
    genre: "Adventure, Drama, Sci-Fi",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    poster: "/pulpfiction.jpeg",
    rating: 8.9,
    year: 1994,
    runtime: 154,
    genre: "Crime, Drama",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: "the-matrix",
    title: "The Matrix",
    poster: "/thematrix.jpeg",
    rating: 8.7,
    year: 1999,
    runtime: 136,
    genre: "Action, Sci-Fi",
    overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix."
  },
  {
    id: "forrest-gump",
    title: "Forrest Gump",
    poster: "/forestgump.webp",
    rating: 8.8,
    year: 1994,
    runtime: 142,
    genre: "Drama, Romance",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    poster: "/topgun.jpeg",
    rating: 8.3,
    year: 2022,
    runtime: 130,
    genre: "Action, Drama",
    overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it."
  },
  {
    id: "black-panther",
    title: "Black Panther",
    poster: "/blackpanther.jpeg",
    rating: 7.3,
    year: 2018,
    runtime: 134,
    genre: "Action, Adventure, Sci-Fi",
    overview: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past."
  },
  {
    id: "avatar-the-way-of-water",
    title: "Avatar: The Way of Water",
    poster: "/avatarthewayofwater.jpeg",
    rating: 7.6,
    year: 2022,
    runtime: 192,
    genre: "Action, Adventure, Fantasy",
    overview: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family."
  },
  {
    id: "goodfellas",
    title: "Goodfellas",
    poster: "/goodfelas.jpeg",
    rating: 8.7,
    year: 1990,
    runtime: 146,
    genre: "Biography, Crime, Drama",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito."
  },
  {
    id: "doctor-strange",
    title: "Doctor Strange",
    poster: "/doctorstranger.jpeg",
    rating: 7.5,
    year: 2016,
    runtime: 115,
    genre: "Action, Adventure, Fantasy",
    overview: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts."
  },
  {
    id: "minions",
    title: "Minions",
    poster: "/minions.jpeg",
    rating: 6.4,
    year: 2015,
    runtime: 91,
    genre: "Animation, Adventure, Comedy",
    overview: "Minions Stuart, Kevin, and Bob are recruited by Scarlet Overkill, a supervillain who, alongside her inventor husband Herb, hatches a plot to take over the world."
  },
  {
    id: "titanic",
    title: "Titanic",
    poster: "/titanic.jpeg",
    rating: 7.9,
    year: 1997,
    runtime: 194,
    genre: "Drama, Romance",
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
  },
  {
    id: "the-godfather",
    title: "The Godfather",
    poster: "/thegodfather.jpeg",
    rating: 9.2,
    year: 1972,
    runtime: 175,
    genre: "Crime, Drama",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    poster: "/avengersendgame.jpeg",
    rating: 8.4,
    year: 2019,
    runtime: 181,
    genre: "Action, Adventure, Drama",
    overview: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe."
  },
  {
    id: "jurassic-park",
    title: "Jurassic Park",
    poster: "/jurassicpark.jpeg",
    rating: 8.1,
    year: 1993,
    runtime: 127,
    genre: "Adventure, Sci-Fi, Thriller",
    overview: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose."
  },
  {
    id: "spider-man-no-way-home",
    title: "Spider-Man: No Way Home",
    poster: "/spiderman.jpeg",
    rating: 8.2,
    year: 2021,
    runtime: 148,
    genre: "Action, Adventure, Fantasy",
    overview: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear."
  },
  {
    id: "the-lion-king",
    title: "The Lion King",
    poster: "/thelionking.jpeg",
    rating: 8.5,
    year: 1994,
    runtime: 88,
    genre: "Animation, Adventure, Drama",
    overview: "A Lion cub crown prince is tricked by a treacherous uncle into thinking he caused his father's death and flees into exile in despair, only to learn in adulthood his identity and his responsibilities."
  },
  {
    id: "deadpool",
    title: "Deadpool",
    poster: "/deadpool.webp",
    rating: 8.0,
    year: 2016,
    runtime: 108,
    genre: "Action, Comedy, Adventure",
    overview: "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks."
  },
  {
    id: "frozen",
    title: "Frozen",
    poster: "/frozen.jpeg",
    rating: 7.4,
    year: 2013,
    runtime: 102,
    genre: "Animation, Adventure, Comedy",
    overview: "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition."
  },
  {
    id: "the-fast-and-the-furious",
    title: "The Fast and the Furious",
    poster: "/The Fast and the Furious.webp",
    rating: 6.8,
    year: 2001,
    runtime: 106,
    genre: "Action, Crime, Thriller",
    overview: "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy."
  },
  {
    id: "wonder-woman",
    title: "Wonder Woman",
    poster: "/wonderwoman.jpeg",
    rating: 7.4,
    year: 2017,
    runtime: 141,
    genre: "Action, Adventure, Fantasy",
    overview: "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny."
  },
  {
    id: "john-wick",
    title: "John Wick",
    poster: "/johnwick.jpeg",
    rating: 7.4,
    year: 2014,
    runtime: 101,
    genre: "Action, Crime, Thriller",
    overview: "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him."
  },
  {
    id: "the-shawshank-redemption",
    title: "The Shawshank Redemption",
    poster: "/The Shawshank Redemption.jpeg",
    rating: 9.3,
    year: 1994,
    runtime: 142,
    genre: "Drama",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: "star-wars-a-new-hope",
    title: "Star Wars: A New Hope",
    poster: "/starwars.jpeg",
    rating: 8.6,
    year: 1977,
    runtime: 121,
    genre: "Adventure, Fantasy, Sci-Fi",
    overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station."
  },
  {
    id: "guardians-of-the-galaxy",
    title: "Guardians of the Galaxy",
    poster: "/guardiansofthegalaxy.jpeg",
    rating: 8.0,
    year: 2014,
    runtime: 121,
    genre: "Action, Adventure, Comedy",
    overview: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe."
  },
  {
    id: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    poster: "/Mad Max_ Fury Road.jpeg",
    rating: 8.1,
    year: 2015,
    runtime: 120,
    genre: "Action, Adventure, Sci-Fi",
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max."
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
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

  const applyFilters = useCallback(() => {
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
  }, [filters]);

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
  }, [filters, applyFilters]);

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
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <FavoriteButton 
                          movie={movie} 
                          className="flex-1 px-3 py-2 rounded-lg text-sm"
                          showText={true}
                        />
                        <WatchlistButton 
                          movie={movie} 
                          className="flex-1 px-3 py-2 rounded-lg text-sm"
                          showText={true}
                        />
                      </div>
                      <Link
                        href={`/movies/${movie.id}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found for &quot;{searchQuery}&quot;</p>
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
