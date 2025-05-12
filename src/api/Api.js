import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDataPages1to50 = () => {
  const API_KEY = 'ee81cc9be5f029e53fc1d34ac9f52d27';
  const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgxY2M5ZjAyOWU1M2ZjMWQzNGFjOWY1MmQyNyIsIm5iZiI6MS43NDYzOTMxODU5NTUwMDAyZSs5LCJzdWIiOiI2ODE3ZDg2MWQ2OWJjNzQ3MTRhMjE2ZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bM7yLuGUENpVrgOJq74z4rsVBgaVKsL4yBq0ZG7OghE';
  const API_URL = 'https://api.themoviedb.org/3/';
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [trailerKeys, setTrailerKeys] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  // جلب أول 50 صفحة من الأفلام الشعبية
  useEffect(() => {
    const fetchPages = async () => {
      const all = [];
      for (let page = 1; page <= 50; page++) {
        try {
          const { data } = await axios.get(`${API_URL}movie/popular`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            params: { api_key: API_KEY, page },
          });
          all.push(...data.results);
          await new Promise(res => setTimeout(res, 250));
        } catch {
          break;
        }
      }
      setMovies(all);
    };
    fetchPages();
  }, []);

  // دالة البحث
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const { data } = await axios.get(`${API_URL}search/movie`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        params: { api_key: API_KEY, query },
      });
      setMovies(data.results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // عند المرور على بوستر لجلب تريلر
  const handleMouseEnter = async (id) => {
    setHoveredId(id);
    if (!trailerKeys[id]) {
      try {
        const { data } = await axios.get(`${API_URL}movie/${id}/videos`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          params: { api_key: API_KEY },
        });
        const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKeys(prev => ({ ...prev, [id]: trailer.key }));
      } catch {
        // نكتفي بالصورة
      }
    }
  };

  const today = new Date();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Popular Movies & Search</h1>

      {/* صندوق البحث */}
      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full max-w-md p-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 bg-blue-600 rounded-r-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(m => {
          const releaseDate = m.release_date ? new Date(m.release_date) : null;
          const year = releaseDate ? releaseDate.getFullYear() : '—';
          const status = releaseDate
            ? (releaseDate <= today ? 'Released' : 'Upcoming')
            : 'Unknown';

          return (
            <div
              key={m.id}
              onMouseEnter={() => handleMouseEnter(m.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {hoveredId === m.id && trailerKeys[m.id] ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKeys[m.id]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKeys[m.id]}`}
                  title={m.title}
                  className="w-full h-72 object-cover"
                  allow="autoplay; encrypted-media"
                />
              ) : m.poster_path ? (
                <img
                  src={`${IMAGE_BASE}${m.poster_path}`}
                  alt={m.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{m.title}</h2>
                <p className="text-gray-300 text-sm mb-2">
                  Year: {year} — {status}
                </p>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {m.overview || 'No description available.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieDataPages1to50;
