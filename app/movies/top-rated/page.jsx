import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Clock } from "lucide-react";
import FavoriteButton from "../../components/FavoriteButton";
import WatchlistButton from "../../components/WatchlistButton";

const topRatedMovies = [
  {
    id: "the-shawshank-redemption",
    title: "The Shawshank Redemption",
    poster: "/The Shawshank Redemption.jpeg",
    rating: 9.3,
    year: 1994,
    runtime: 142,
    genre: "Drama",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: "the-godfather",
    title: "The Godfather",
    poster: "/thegodfather.jpeg",
    rating: 9.2,
    year: 1972,
    runtime: 175,
    genre: "Crime, Drama",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    poster: "/pulpfiction.jpeg",
    rating: 8.9,
    year: 1994,
    runtime: 154,
    genre: "Crime, Drama",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: "inception",
    title: "Inception",
    poster: "/inception.jpeg",
    rating: 8.8,
    year: 2010,
    runtime: 148,
    genre: "Action, Sci-Fi, Thriller",
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    poster: "/interstller.jpeg",
    rating: 8.6,
    year: 2014,
    runtime: 169,
    genre: "Adventure, Drama, Sci-Fi",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: "star-wars-a-new-hope",
    title: "Star Wars: A New Hope",
    poster: "/starwars.jpeg",
    rating: 8.6,
    year: 1977,
    runtime: 121,
    genre: "Adventure, Fantasy, Sci-Fi",
    overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire&apos;s world-destroying battle station.",
  },
  {
    id: "the-lion-king",
    title: "The Lion King",
    poster: "/thelionking.jpeg",
    rating: 8.5,
    year: 1994,
    runtime: 88,
    genre: "Animation, Adventure, Drama",
    overview: "A Lion cub crown prince is tricked by a treacherous uncle into thinking he caused his father&apos;s death and flees into exile in despair, only to learn in adulthood his identity and his responsibilities.",
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    poster: "/avengersendgame.jpeg",
    rating: 8.4,
    year: 2019,
    runtime: 181,
    genre: "Action, Adventure, Drama",
    overview: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos&apos; actions and restore balance to the universe.",
  },
  {
    id: "spider-man-no-way-home",
    title: "Spider-Man: No Way Home",
    poster: "/spiderman.jpeg",
    rating: 8.2,
    year: 2021,
    runtime: 148,
    genre: "Action, Adventure, Fantasy",
    overview: "With Spider-Man&apos;s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
  },
  
  {
    id: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    poster: "/Mad Max_ Fury Road.jpeg",
    rating: 8.1,
    year: 2015,
    runtime: 120,
    genre: "Action, Adventure, Sci-Fi",
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
  },
  {
    id: "titanic",
    title: "Titanic",
    poster: "/titanic.jpeg",
    rating: 7.9,
    year: 1997,
    runtime: 194,
    genre: "Drama, Romance",
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
  },
  {
    id: "avatar-the-way-of-water",
    title: "Avatar: The Way of Water",
    poster: "/avatarthewayofwater.jpeg",
    rating: 7.6,
    year: 2022,
    runtime: 192,
    genre: "Action, Adventure, Fantasy",
    overview: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
  },
];

export default function TopRatedPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Top Rated Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topRatedMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center bg-yellow-600 text-white px-3 py-1 rounded-full">
                    <Star className="mr-1" size={16} />
                    {movie.rating}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="mr-1" />
                    {movie.year}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock size={16} className="mr-1" />
                    {movie.runtime} min
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{movie.genre}</p>
                <p className="text-gray-300 mb-4">{movie.overview}</p>
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
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
