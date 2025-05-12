import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import MediaCard from './MediaCard';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';

const categoryMap = {
  popular: { title: 'Popular Movies', endpoint: 'movie/popular' },
  trending: { title: 'Trending Movies', endpoint: 'trending/movie/week' },
  'top-rated': { title: 'Top Rated Movies', endpoint: 'movie/top_rated' },
  upcoming: { title: 'Coming Soon', endpoint: 'movie/upcoming' },
};

const MoviesListPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = categoryMap[category]?.endpoint;
        if (!endpoint) throw new Error('Invalid category');
        let allResults = [];
        // Fetch first 5 pages (100 movies max)
        for (let page = 1; page <= 5; page++) {
          const res = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY, page },
          });
          allResults = allResults.concat(res.data.results);
        }
        setMovies(allResults);
      } catch (err) {
        setError(err.message || 'Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  // For 'upcoming', only show movies with a release_date in the future
  let filteredMovies = movies;
  if (category === 'upcoming') {
    const today = new Date();
    filteredMovies = movies.filter(movie => {
      if (!movie.release_date) return false;
      return new Date(movie.release_date) > today;
    });
  }

  // Filter by search
  filteredMovies = filteredMovies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[black] w-full py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">{categoryMap[category]?.title || 'Movies'}</h1>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-[#181828] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {filteredMovies.map(movie => (
            <MediaCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imagePath={movie.poster_path}
              year={movie.release_date?.slice(0, 4)}
              rating={movie.vote_average}
              type="movie"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesListPage; 