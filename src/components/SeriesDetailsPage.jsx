import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import FreeTrail from './FreeTrail';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[500px] bg-gray-800 rounded-b-2xl mb-8" />
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="h-64 bg-gray-800 rounded-xl" />
        <div className="h-96 bg-gray-800 rounded-xl" />
        <div className="h-64 bg-gray-800 rounded-xl" />
      </div>
      <div className="w-full md:w-[320px] h-[500px] bg-gray-800 rounded-xl" />
    </div>
  </div>
);

export default function SeriesDetailsPage() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSeason, setOpenSeason] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState({});

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        const [seriesRes, reviewsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY, append_to_response: 'credits' },
          }),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY },
          })
        ]);
        setSeries(seriesRes.data);
        setReviews(reviewsRes.data.results);
      } catch {
        setError('Failed to fetch series details.');
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, [id]);

  const handleSeasonToggle = async (season) => {
    if (openSeason === season.season_number) {
      setOpenSeason(null);
      return;
    }
    setOpenSeason(season.season_number);
    if (!seasonEpisodes[season.season_number]) {
      setSeasonEpisodes(prev => ({ ...prev, [season.season_number]: { loading: true, episodes: [] } }));
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}`, {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: { api_key: TMDB_API_KEY },
        });
        setSeasonEpisodes(prev => ({ ...prev, [season.season_number]: { loading: false, episodes: res.data.episodes } }));
      } catch {
        setSeasonEpisodes(prev => ({ ...prev, [season.season_number]: { loading: false, episodes: [] } }));
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!series) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[500px] md:h-[600px] flex items-end rounded-b-2xl overflow-hidden mb-12" 
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${TMDB_BACKDROP_BASE_URL}${series.backdrop_path}) center/cover`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <div className="relative z-20 p-8 md:p-16 w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{series.name}</h1>
              <p className="text-gray-300 text-lg max-w-2xl mb-6 drop-shadow">{series.overview}</p>
              <div className="flex gap-3">
                <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 text-lg transition-colors">
                  <span className="text-xl">▶</span> Play Now
                </button>
                <button className="bg-black/60 hover:bg-black/80 border border-gray-700 text-white p-3 rounded-lg transition-colors">
                  <span className="text-xl">+</span>
                </button>
                <button className="bg-black/60 hover:bg-black/80 border border-gray-700 text-white p-3 rounded-lg transition-colors">
                  <span className="text-xl">♡</span>
                </button>
                <button className="bg-black/60 hover:bg-black/80 border border-gray-700 text-white p-3 rounded-lg transition-colors">
                  <span className="text-xl">⤴</span>
                </button>
              </div>
            </div>
            <div className="hidden md:block w-48 h-72 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src={`${TMDB_IMAGE_BASE_URL}${series.poster_path}`}
                alt={series.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Seasons and Episodes */}
          <div className="bg-[#181828] rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Seasons and Episodes</h2>
            <div className="flex flex-col gap-6">
              {series.seasons?.map(season => (
                <div key={season.id} className="bg-[#181828] rounded-xl border border-neutral-800 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 focus:outline-none hover:bg-black/10 transition-colors"
                    onClick={() => handleSeasonToggle(season)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-white text-xl md:text-2xl">{season.name}</span>
                      <span className="text-gray-400 text-base">{season.episode_count} Episodes</span>
                    </div>
                    <span className={`transition-transform ${openSeason === season.season_number ? 'rotate-180' : ''} text-gray-400`}>
                      ▼
                    </span>
                  </button>
                  {openSeason === season.season_number && (
                    <div className="px-6 pb-6">
                      {seasonEpisodes[season.season_number]?.loading ? (
                        <div className="py-8 text-center text-gray-400">Loading episodes...</div>
                      ) : (
                        <div className="flex flex-col divide-y divide-neutral-800">
                          {seasonEpisodes[season.season_number]?.episodes?.map((ep, idx, arr) => (
                            <div key={ep.id} className={`flex items-start gap-5 py-8 ${idx === arr.length - 1 ? '' : ''}`}> 
                              <div className="w-12 min-w-[48px] font-semibold text-gray-400 text-2xl flex-shrink-0 flex items-center justify-center">{String(ep.episode_number).padStart(2, '0')}</div>
                              <div className="w-[140px] h-[80px] md:w-[172px] md:h-[100px] relative rounded-xl overflow-hidden border border-solid border-neutral-800 flex-shrink-0">
                                {ep.still_path ? (
                                  <img src={`${TMDB_IMAGE_BASE_URL}${ep.still_path}`} alt={ep.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="font-semibold text-white text-base md:text-lg line-clamp-1">{ep.name}</span>
                                  <span className="flex items-center gap-1 text-gray-400 text-xs md:text-sm border border-gray-700 rounded px-2 py-0.5">
                                    {ep.runtime ? `${ep.runtime} min` : '—'}
                                  </span>
                                </div>
                                <div className="text-gray-400 text-sm line-clamp-2">{ep.overview || 'No description.'}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cast */}
          <div className="bg-[#181828] rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {series.credits?.cast?.slice(0, 10).map(actor => (
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
                <div className="text-gray-400 text-sm mb-2">Released Year</div>
                <div className="text-white text-xl font-semibold">{series.first_air_date?.slice(0, 4)}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Available Languages</div>
                <div className="flex flex-wrap gap-2">
                  {series.languages?.map(lang => (
                    <span key={lang} className="bg-gray-700/50 text-white text-xs px-3 py-1 rounded-full">{lang}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Ratings</div>
                <div className="flex gap-2">
                  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">IMDb {series.vote_average?.toFixed(1)}</span>
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Streamvibe 4.0</span>
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Genres</div>
                <div className="flex flex-wrap gap-2">
                  {series.genres?.map(g => (
                    <span key={g.id} className="bg-purple-900/50 text-purple-200 text-xs px-3 py-1 rounded-full">{g.name}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Created By</div>
                <div className="text-white text-sm">
                  {series.created_by?.map(creator => creator.name).join(', ') || 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Status</div>
                <div className="text-white text-sm">{series.status}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Free Trial CTA */}
      <FreeTrail />
    </div>
  );
} 