import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import MediaCard from './MediaCard';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';



const GenreListPage = () => {
  const { genreId, genreName } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!genreId) {
      setError('Invalid genre selected');
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let allResults = [];
        // Fetch first 5 pages (100 movies max)
        for (let page = 1; page <= 5; page++) {
          const res = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: {
              api_key: TMDB_API_KEY,
              with_genres: genreId,
              sort_by: 'popularity.desc',
              page,
            },
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
  }, [genreId]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[black] w-full py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">{genreName} Movies</h1>
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

export default GenreListPage; 