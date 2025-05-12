import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function SeriesListPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAllSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        let allResults = [];
        // Fetch the first page to get total_pages
        const firstRes = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: {
            api_key: TMDB_API_KEY,
            sort_by: 'first_air_date.desc',
            'first_air_date.gte': '2017-01-01',
            'first_air_date.lte': '2019-12-31',
            page: 1,
            with_original_language: 'en',
          },
        });
        const totalPages = Math.min(firstRes.data.total_pages, 200); // TMDB max 1000 pages
        allResults = allResults.concat(firstRes.data.results);
        // Fetch remaining pages
        const promises = [];
        for (let page = 2; page <= totalPages; page++) {
          promises.push(
            axios.get('https://api.themoviedb.org/3/discover/tv', {
              headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
              params: {
                api_key: TMDB_API_KEY,
                sort_by: 'first_air_date.desc',
                'first_air_date.gte': '2017-01-01',
                'first_air_date.lte': '2024-12-31',
                page,
                with_original_language: 'en',
              },
            })
          );
        }
        const results = await Promise.all(promises);
        results.forEach(res => {
          allResults = allResults.concat(res.data.results);
        });
        // Only include series with posters, names, and a valid first_air_date
        const filtered = allResults.filter(
          show =>
            show.poster_path &&
            show.name &&
            show.first_air_date
        );
        setSeries(filtered);
      } catch {
        setError('Failed to fetch series.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllSeries();
  }, []);

  const filteredSeries = series.filter(show =>
    show.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-10">{error}</div>;

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[black] w-full py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">All TV Series (2017–2024)</h1>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search series..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-[#181828] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {filteredSeries.map(show => (
            <Link key={show.id} to={`/series/${show.id}`} className="bg-[#181828] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform flex flex-col">
              <img
                src={`${TMDB_IMAGE_BASE_URL}${show.poster_path}`}
                alt={show.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1 line-clamp-2">{show.name}</h2>
                  <div className="text-gray-400 text-sm mb-2">{show.first_air_date?.slice(0, 4) || 'N/A'}</div>
                </div>
                <div className="mt-auto text-yellow-400 font-bold">{show.vote_average?.toFixed(1)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 