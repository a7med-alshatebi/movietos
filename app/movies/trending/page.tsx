'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, Star, Calendar, Clock, Flame } from 'lucide-react';
import FavoriteButton from '../../components/FavoriteButton';
import WatchlistButton from '../../components/WatchlistButton';

// Mock data for trending movies
const mockTrendingMovies = [
	{
		id: 1,
		title: 'Avatar: The Way of Water',
		poster: '/avatarthewayofwater.jpeg',
		rating: 7.6,
		year: 2022,
		runtime: 192,
		genre: 'Action, Adventure, Drama',
		overview:
			'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.',
		trending: 1,
		change: '+5',
	},
	{
		id: 2,
		title: 'Top Gun: Maverick',
		poster: '/topgun.jpeg',
		rating: 8.3,
		year: 2022,
		runtime: 130,
		genre: 'Action, Drama',
		overview: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
		trending: 2,
		change: '+2',
	},
	{
		id: 3,
		title: 'Black Panther: Wakanda Forever',
		poster: '/blackpanther.jpeg',
		rating: 6.7,
		year: 2022,
		runtime: 161,
		genre: 'Action, Adventure, Drama',
		overview: 'The people of Wakanda fight to protect their home from intervening world powers.',
		trending: 3,
		change: '-1',
	},
	{
		id: 4,
		title: 'The Batman',

		poster: '/batman.jpeg',
		rating: 7.8,
		year: 2022,
		runtime: 176,
		genre: 'Action, Crime, Drama',
		overview: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham.',
		trending: 4,
		change: '+3',
	},
	{
		id: 5,
		title: 'Doctor Strange in the Multiverse of Madness',
		poster: '/doctorstranger.jpeg',
		rating: 6.9,
		year: 2022,
		runtime: 126,
		genre: 'Action, Adventure, Fantasy',
		overview: 'Doctor Strange teams up with a mysterious young woman who can travel across multiverses.',
		trending: 5,
		change: '0',
	},
	{
		id: 6,
		title: 'Minions: The Rise of Gru',
		poster: '/minions.jpeg',
		rating: 6.5,
		year: 2022,
		runtime: 87,
		genre: 'Animation, Adventure, Comedy',
		overview: "The untold story of one twelve-year-old's dream to become the world's greatest supervillain.",
		trending: 6,
		change: '+1',
	},
];

export default function TrendingPage() {
	const [trendingMovies, setTrendingMovies] = useState(mockTrendingMovies);
	const [period, setPeriod] = useState('week');
	const [loading, setLoading] = useState(false);

	const handlePeriodChange = (newPeriod: string) => {
		setPeriod(newPeriod);
		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			// In a real app, you would fetch different data based on the period
			setTrendingMovies(mockTrendingMovies);
			setLoading(false);
		}, 500);
	};

	const getTrendingIcon = (rank: number) => {
		if (rank === 1) return <Flame className="text-red-500" size={24} />;
		if (rank === 2) return <TrendingUp className="text-orange-500" size={24} />;
		if (rank === 3) return <TrendingUp className="text-yellow-500" size={24} />;
		return <TrendingUp className="text-gray-500" size={24} />;
	};

	const getChangeColor = (change: string) => {
		if (change.startsWith('+')) return 'text-green-500';
		if (change.startsWith('-')) return 'text-red-500';
		return 'text-gray-500';
	};

	return (
		<div className="min-h-screen bg-gray-900">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
						<TrendingUp className="mr-3 text-purple-400" size={40} />
						Trending Movies
					</h1>
					<p className="text-gray-400">Discover what&apos;s popular right now</p>
				</div>

				{/* Period Selector */}
				<div className="flex justify-center mb-8">
					<div className="bg-gray-800 rounded-lg p-1 flex">
						{['day', 'week', 'month'].map((periodOption) => (
							<button
								key={periodOption}
								onClick={() => handlePeriodChange(periodOption)}
								className={`px-6 py-2 rounded-md transition-colors capitalize ${
									period === periodOption
										? 'bg-purple-600 text-white'
										: 'text-gray-400 hover:text-white'
								}`}
							>
								{periodOption}
							</button>
						))}
					</div>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
						<p className="text-gray-400 mt-4">Loading trending movies...</p>
					</div>
				)}

				{/* Trending Movies */}
				{!loading && (
					<div className="space-y-6">
						{trendingMovies.map((movie) => (
							<div
								key={movie.id}
								className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="flex flex-col md:flex-row">
									{/* Rank and Poster */}
									<div className="flex md:flex-col items-center md:items-start p-4 md:p-6">
										<div className="flex items-center mb-4 mr-4 md:mr-0">
											<div className="text-4xl font-bold text-white mr-2">#{movie.trending}</div>
											{getTrendingIcon(movie.trending)}
										</div>
										<Image
											src={movie.poster}
											alt={movie.title}
											width={200}
											height={300}
											className="w-32 md:w-48 h-48 md:h-72 object-cover rounded-lg"
										/>
									</div>

									{/* Movie Info */}
									<div className="flex-1 p-4 md:p-6">
										<div className="flex items-start justify-between mb-4">
											<h2 className="text-2xl font-bold text-white">{movie.title}</h2>
											<div className={`text-sm font-semibold ${getChangeColor(movie.change)}`}>
												{movie.change !== '0' ? movie.change : 'Same'}
											</div>
										</div>

										{/* Movie Details */}
										<div className="flex items-center space-x-6 mb-4">
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

										{/* Genre */}
										<p className="text-gray-400 text-sm mb-4">{movie.genre}</p>

										{/* Overview */}
										<p className="text-gray-300 mb-6 leading-relaxed">{movie.overview}</p>

										{/* Action Buttons */}
										<div className="flex space-x-4">
						<Link
  					href={`/movies/trending/${movie.id}`}
  					className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
					>
 				 View Details
						</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Trending Stats */}
				<div className="mt-12 bg-gray-800 rounded-lg p-6">
					<h3 className="text-2xl font-bold text-white mb-4">Trending Stats</h3>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-400 mb-2">📈</div>
							<h4 className="text-lg font-semibold text-white mb-1">Most Watched</h4>
							<p className="text-gray-400">Avatar: The Way of Water</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-400 mb-2">⭐</div>
							<h4 className="text-lg font-semibold text-white mb-1">Highest Rated</h4>
							<p className="text-gray-400">Top Gun: Maverick</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-400 mb-2">🔥</div>
							<h4 className="text-lg font-semibold text-white mb-1">Rising Star</h4>
							<p className="text-gray-400">The Batman</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
