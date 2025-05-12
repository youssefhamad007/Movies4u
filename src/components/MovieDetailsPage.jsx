import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import FreeTrail from './FreeTrail';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const [movieRes, reviewsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY, append_to_response: 'credits' },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY },
          })
        ]);
        setMovie(movieRes.data);
        setReviews(reviewsRes.data.results);
      } catch {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[500px] md:h-[600px] flex items-end rounded-b-2xl overflow-hidden mb-12" 
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}) center/cover`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <div className="relative z-20 p-8 md:p-16 w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{movie.title}</h1>
              <p className="text-gray-300 text-lg max-w-2xl mb-6 drop-shadow">{movie.overview}</p>
              <div className="flex gap-3">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">IMDb {movie.vote_average?.toFixed(1)}</span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">{movie.release_date?.slice(0, 4)}</span>
                <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">{movie.runtime} min</span>
              </div>
            </div>
            <div className="hidden md:block w-48 h-72 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Genres */}
          <div className="bg-[#181828] rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map(g => (
                <span key={g.id} className="bg-purple-900/50 text-purple-200 text-xs px-3 py-1 rounded-full">{g.name}</span>
              ))}
            </div>
          </div>

          {/* Cast */}
          <div className="bg-[#181828] rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movie.credits?.cast?.slice(0, 10).map(actor => (
                <div key={actor.id} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-purple-500/50">
                    <img
                      src={actor.profile_path ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}` : '/default-avatar.png'}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white text-sm font-semibold text-center">{actor.name}</div>
                  <div className="text-gray-400 text-xs text-center">{actor.character}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-[#181828] rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.length === 0 ? (
                <div className="text-gray-400 col-span-2 text-center py-8">No reviews found.</div>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="bg-[#232344] rounded-lg p-6 hover:bg-[#2a2a4a] transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center text-white font-bold">
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{review.author}</div>
                        <div className="text-gray-400 text-sm">{new Date(review.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm line-clamp-4">{review.content}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-[320px] flex-shrink-0 space-y-6">
          <div className="bg-[#181828] rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <div className="text-gray-400 text-sm mb-2">Release Date</div>
                <div className="text-white text-xl font-semibold">{movie.release_date}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Status</div>
                <div className="text-white text-sm">{movie.status}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Budget</div>
                <div className="text-white text-sm">${movie.budget?.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Revenue</div>
                <div className="text-white text-sm">${movie.revenue?.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Production Companies</div>
                <div className="text-white text-sm">
                  {movie.production_companies?.map(c => c.name).join(', ') || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <FreeTrail />
    </div>
  );
} 