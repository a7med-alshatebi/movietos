'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, Clock, Play } from 'lucide-react';
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
  },
  "titanic": {
    id: 13,
    title: "Titanic",
    poster: "/titanic.jpeg",
    backdrop: "/titanic.jpeg",
    rating: 7.9,
    year: 1997,
    runtime: 194,
    genre: "Drama, Romance",
    director: "James Cameron",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Gloria Stuart"],
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    budget: 200000000,
    revenue: 2257844554,
    tagline: "Nothing on Earth could come between them.",
    trailerUrl: "https://www.youtube.com/watch?v=2e-eXJ6HgkQ"
  },
  "the-godfather": {
    id: 14,
    title: "The Godfather",
    poster: "/godfather.jpeg",
    backdrop: "/godfather.jpeg",
    rating: 9.2,
    year: 1972,
    runtime: 175,
    genre: "Crime, Drama",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    budget: 6000000,
    revenue: 287000000,
    tagline: "An offer you can't refuse.",
    trailerUrl: "https://www.youtube.com/watch?v=UaVTIH8mujA"
  },
  "avengers-endgame": {
    id: 15,
    title: "Avengers: Endgame",
    poster: "/avengers-endgame.jpeg",
    backdrop: "/avengers-endgame.jpeg",
    rating: 8.4,
    year: 2019,
    runtime: 181,
    genre: "Action, Adventure, Drama",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    overview: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    budget: 356000000,
    revenue: 2797501328,
    tagline: "Avenge the fallen.",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
  },
  "jurassic-park": {
    id: 16,
    title: "Jurassic Park",
    poster: "/jurassic-park.jpeg",
    backdrop: "/jurassic-park.jpeg",
    rating: 8.1,
    year: 1993,
    runtime: 127,
    genre: "Adventure, Sci-Fi, Thriller",
    director: "Steven Spielberg",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum", "Richard Attenborough"],
    overview: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    budget: 63000000,
    revenue: 1046344801,
    tagline: "An adventure 65 million years in the making.",
    trailerUrl: "https://www.youtube.com/watch?v=lc0UehYemQA"
  },
  "spider-man-no-way-home": {
    id: 17,
    title: "Spider-Man: No Way Home",
    poster: "/spider-man-nwh.jpeg",
    backdrop: "/spider-man-nwh.jpeg",
    rating: 8.2,
    year: 2021,
    runtime: 148,
    genre: "Action, Adventure, Fantasy",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
    overview: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    budget: 200000000,
    revenue: 1921847111,
    tagline: "The multiverse unleashed.",
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
  },
  "the-lion-king": {
    id: 18,
    title: "The Lion King",
    poster: "/lion-king.jpeg",
    backdrop: "/lion-king.jpeg",
    rating: 8.5,
    year: 1994,
    runtime: 88,
    genre: "Animation, Adventure, Drama",
    director: "Roger Allers, Rob Minkoff",
    cast: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones", "Moira Kelly"],
    overview: "A Lion cub crown prince is tricked by a treacherous uncle into thinking he caused his father's death and flees into exile in despair, only to learn in adulthood his identity and his responsibilities.",
    budget: 45000000,
    revenue: 968511805,
    tagline: "The greatest adventure of all is finding our place in the circle of life.",
    trailerUrl: "https://www.youtube.com/watch?v=lFzVJEksoDY"
  },
  "deadpool": {
    id: 19,
    title: "Deadpool",
    poster: "/deadpool.jpeg",
    backdrop: "/deadpool.jpeg",
    rating: 8.0,
    year: 2016,
    runtime: 108,
    genre: "Action, Comedy, Adventure",
    director: "Tim Miller",
    cast: ["Ryan Reynolds", "Morena Baccarin", "Ed Skrein", "T.J. Miller"],
    overview: "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
    budget: 58000000,
    revenue: 782612155,
    tagline: "Feel the love.",
    trailerUrl: "https://www.youtube.com/watch?v=9SW7-8C8kL4"
  },
  "frozen": {
    id: 20,
    title: "Frozen",
    poster: "/frozen.jpeg",
    backdrop: "/frozen.jpeg",
    rating: 7.4,
    year: 2013,
    runtime: 102,
    genre: "Animation, Adventure, Comedy",
    director: "Chris Buck, Jennifer Lee",
    cast: ["Kristen Bell", "Idina Menzel", "Jonathan Groff", "Josh Gad"],
    overview: "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.",
    budget: 150000000,
    revenue: 1282973738,
    tagline: "Only an act of true love can thaw a frozen heart.",
    trailerUrl: "https://www.youtube.com/watch?v=TbQm5doF_Uc"
  },
  "the-fast-and-the-furious": {
    id: 21,
    title: "The Fast and the Furious",
    poster: "/fast-furious.jpeg",
    backdrop: "/fast-furious.jpeg",
    rating: 6.8,
    year: 2001,
    runtime: 106,
    genre: "Action, Crime, Thriller",
    director: "Rob Cohen",
    cast: ["Paul Walker", "Vin Diesel", "Michelle Rodriguez", "Jordana Brewster"],
    overview: "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.",
    budget: 38000000,
    revenue: 207283925,
    tagline: "If you have what it takes, you can have it all.",
    trailerUrl: "https://www.youtube.com/watch?v=2TAOizOnNPo"
  },
  "wonder-woman": {
    id: 22,
    title: "Wonder Woman",
    poster: "/wonder-woman.jpeg",
    backdrop: "/wonder-woman.jpeg",
    rating: 7.4,
    year: 2017,
    runtime: 141,
    genre: "Action, Adventure, Fantasy",
    director: "Patty Jenkins",
    cast: ["Gal Gadot", "Chris Pine", "Robin Wright", "Danny Huston"],
    overview: "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.",
    budget: 149000000,
    revenue: 821847012,
    tagline: "Power. Grace. Wisdom. Wonder.",
    trailerUrl: "https://www.youtube.com/watch?v=1Q8fG0TtVAY"
  },
  "john-wick": {
    id: 23,
    title: "John Wick",
    poster: "/john-wick.jpeg",
    backdrop: "/john-wick.jpeg",
    rating: 7.4,
    year: 2014,
    runtime: 101,
    genre: "Action, Crime, Thriller",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen", "Willem Dafoe"],
    overview: "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
    budget: 20000000,
    revenue: 86013179,
    tagline: "Don't set him off.",
    trailerUrl: "https://www.youtube.com/watch?v=C0BMx-qxsP4"
  },
  "the-shawshank-redemption": {
    id: 24,
    title: "The Shawshank Redemption",
    poster: "/shawshank.jpeg",
    backdrop: "/shawshank.jpeg",
    rating: 9.3,
    year: 1994,
    runtime: 142,
    genre: "Drama",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    budget: 25000000,
    revenue: 28341469,
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    trailerUrl: "https://www.youtube.com/watch?v=NmzuHjWmXOc"
  },
  "star-wars-a-new-hope": {
    id: 25,
    title: "Star Wars: A New Hope",
    poster: "/star-wars-anh.jpeg",
    backdrop: "/star-wars-anh.jpeg",
    rating: 8.6,
    year: 1977,
    runtime: 121,
    genre: "Adventure, Fantasy, Sci-Fi",
    director: "George Lucas",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Peter Cushing"],
    overview: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    budget: 11000000,
    revenue: 775398007,
    tagline: "A long time ago in a galaxy far, far away...",
    trailerUrl: "https://www.youtube.com/watch?v=1g3_CFmnU7k"
  },
  "guardians-of-the-galaxy": {
    id: 26,
    title: "Guardians of the Galaxy",
    poster: "/guardians-galaxy.jpeg",
    backdrop: "/guardians-galaxy.jpeg",
    rating: 8.0,
    year: 2014,
    runtime: 121,
    genre: "Action, Adventure, Comedy",
    director: "James Gunn",
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel"],
    overview: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
    budget: 196000000,
    revenue: 773350147,
    tagline: "All heroes start somewhere.",
    trailerUrl: "https://www.youtube.com/watch?v=d96cjJhvlMA"
  },
  "mad-max-fury-road": {
    id: 27,
    title: "Mad Max: Fury Road",
    poster: "/mad-max.jpeg",
    backdrop: "/mad-max.jpeg",
    rating: 8.1,
    year: 2015,
    runtime: 120,
    genre: "Action, Adventure, Sci-Fi",
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    budget: 150000000,
    revenue: 374583625,
    tagline: "What a lovely day.",
    trailerUrl: "https://www.youtube.com/watch?v=hEJnMQG9ev8"
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
  12: "minions",
  13: "titanic",
  14: "the-godfather",
  15: "avengers-endgame",
  16: "jurassic-park",
  17: "spider-man-no-way-home",
  18: "the-lion-king",
  19: "deadpool",
  20: "frozen",
  21: "the-fast-and-the-furious",
  22: "wonder-woman",
  23: "john-wick",
  24: "the-shawshank-redemption",
  25: "star-wars-a-new-hope",
  26: "guardians-of-the-galaxy",
  27: "mad-max-fury-road"
};

export default function MovieDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  // Try to find movie by slug first, then by numeric ID if it's a number
  let movie: MovieDetail | undefined = mockMovieDetails[id?.toString() || ""];
  
  // If not found and ID is numeric, try to find by numeric ID in the data
  if (!movie && id && !isNaN(Number(id))) {
    const numericId = Number(id);
    movie = Object.values(mockMovieDetails).find(m => m.id === numericId);
  }

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
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              The movie you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/movies"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Browse Movies
              </Link>
              <Link
                href="/"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Go Home
              </Link>
            </div>
            {/* Debug info (can be removed in production) */}
            <details className="mt-8 text-left max-w-2xl mx-auto">
              <summary className="text-gray-500 cursor-pointer">Debug Info</summary>
              <div className="bg-gray-800 p-4 rounded mt-2 text-sm">
                <p className="text-gray-400">Requested ID: <span className="text-white">{id}</span></p>
                <p className="text-gray-400">Available slug IDs: <span className="text-white">{Object.keys(mockMovieDetails).join(', ')}</span></p>
                <p className="text-gray-400">Available numeric IDs: <span className="text-white">{Object.values(mockMovieDetails).map(m => m.id).join(', ')}</span></p>
              </div>
            </details>
          </div>
        </div>
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
        totalPages={27}
        idToSlugMap={idToSlugMap}
      />
    </div>
  );
}
