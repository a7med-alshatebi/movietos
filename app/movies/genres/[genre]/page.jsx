"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Calendar, Clock, ArrowLeft } from "lucide-react";
import FavoriteButton from "../../../components/FavoriteButton";
import WatchlistButton from "../../../components/WatchlistButton";

// Sample movie data organized by genre
const moviesByGenre = {
  action: [
    {
      id: "the-dark-knight",
      title: "The Dark Knight",
      poster: "/batman.jpeg",
      rating: 9.0,
      year: 2008,
      runtime: 152,
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    },
    {
      id: "top-gun-maverick",
      title: "Top Gun: Maverick",
      poster: "/topgun.jpeg",
      rating: 8.3,
      year: 2022,
      runtime: 130,
      overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
    },
    {
      id: "black-panther",
      title: "Black Panther",
      poster: "/blackpanther.jpeg",
      rating: 7.3,
      year: 2018,
      runtime: 134,
      overview: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
    },
  ],
  adventure: [
    {
      id: "avatar-the-way-of-water",
      title: "Avatar: The Way of Water",
      poster: "/avatarthewayofwater.jpeg",
      rating: 7.6,
      year: 2022,
      runtime: 192,
      overview: "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
    },
    {
      id: "interstellar",
      title: "Interstellar",
      poster: "/interstller.jpeg",
      rating: 8.6,
      year: 2014,
      runtime: 169,
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
  ],
  drama: [
    {
      id: "forrest-gump",
      title: "Forrest Gump",
      poster: "/forestgump.webp",
      rating: 8.8,
      year: 1994,
      runtime: 142,
      overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    },
    {
      id: "goodfellas",
      title: "Goodfellas",
      poster: "/goodfelas.jpeg",
      rating: 8.7,
      year: 1990,
      runtime: 146,
      overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    },
    {
      id: "pulp-fiction",
      title: "Pulp Fiction",
      poster: "/pulpfiction.jpeg",
      rating: 8.9,
      year: 1994,
      runtime: 154,
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
  ],
  "sci-fi": [
    {
      id: "inception",
      title: "Inception",
      poster: "/inception.jpeg",
      rating: 8.8,
      year: 2010,
      runtime: 148,
      overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    },
    {
      id: "the-matrix",
      title: "The Matrix",
      poster: "/thematrix.jpeg",
      rating: 8.7,
      year: 1999,
      runtime: 136,
      overview: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    },
    {
      id: "doctor-strange",
      title: "Doctor Strange",
      poster: "/doctorstranger.jpeg",
      rating: 7.5,
      year: 2016,
      runtime: 115,
      overview: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
    },
  ],
  crime: [
    {
      id: "goodfellas",
      title: "Goodfellas",
      poster: "/goodfelas.jpeg",
      rating: 8.7,
      year: 1990,
      runtime: 146,
      overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    },
    {
      id: "pulp-fiction",
      title: "Pulp Fiction",
      poster: "/pulpfiction.jpeg",
      rating: 8.9,
      year: 1994,
      runtime: 154,
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
  ],
  romance: [
    {
      id: "forrest-gump",
      title: "Forrest Gump",
      poster: "/forestgump.webp",
      rating: 8.8,
      year: 1994,
      runtime: 142,
      overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    },
  ],
  comedy: [
    {
      id: "minions",
      title: "Minions",
      poster: "/minions.jpeg",
      rating: 6.4,
      year: 2015,
      runtime: 91,
      overview: "Minions Stuart, Kevin, and Bob are recruited by Scarlet Overkill, a supervillain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
    },
  ],
  animation: [
    {
      id: "minions",
      title: "Minions",
      poster: "/minions.jpeg",
      rating: 6.4,
      year: 2015,
      runtime: 91,
      overview: "Minions Stuart, Kevin, and Bob are recruited by Scarlet Overkill, a supervillain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
    },
  ],
  fantasy: [
    {
      id: "doctor-strange",
      title: "Doctor Strange",
      poster: "/doctorstranger.jpeg",
      rating: 7.5,
      year: 2016,
      runtime: 115,
      overview: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
    },
  ],
};

export default function GenreMoviesPage() {
  const params = useParams();
  const genre = params.genre;
  const movies = moviesByGenre[genre] || [];

  const capitalizeGenre = (str) => {
    if (str === "sci-fi") return "Sci-Fi";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/movies/genres"
            className="flex items-center text-purple-400 hover:text-purple-300 mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Genres
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          {capitalizeGenre(genre)} Movies
        </h1>

        {movies.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <p className="text-xl">No movies found for this genre.</p>
            <Link
              href="/movies/genres"
              className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse Other Genres
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {movie.title}
                  </h2>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center bg-yellow-600 text-white px-2 py-1 rounded-full text-sm">
                      <Star className="mr-1" size={14} />
                      {movie.rating}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {movie.year}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock size={14} className="mr-1" />
                      {movie.runtime} min
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {movie.overview}
                  </p>
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
                      className="w-full block text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
