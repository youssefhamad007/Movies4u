import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';

const SignIn = () => {
  const [backdropUrl, setBackdropUrl] = useState('');

  useEffect(() => {
    const fetchMovieBackdrop = async () => {
      try {
        // Search for See TV series
        const searchResponse = await axios.get('https://api.themoviedb.org/3/search/tv', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: {
            api_key: TMDB_API_KEY,
            query: 'See',
            language: 'en-US',
            page: 1
          }
        });

        if (searchResponse.data.results.length > 0) {
          const seriesId = searchResponse.data.results[0].id;
          const seriesResponse = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY }
          });

          if (seriesResponse.data.backdrop_path) {
            setBackdropUrl(`https://image.tmdb.org/t/p/original${seriesResponse.data.backdrop_path}`);
          }
        }
      } catch (error) {
        console.error('Error fetching series backdrop:', error);
      }
    };

    fetchMovieBackdrop();
  }, []);

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'slowScale 20s ease-in-out infinite alternate'
        }}
      >
        <style>
          {`
            @keyframes slowScale {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(1.1);
              }
            }
          `}
        </style>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-[1px]"></div>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-300">
                Or{' '}
                <Link to="/signup" className="font-medium text-[#511F5C] hover:text-[#6A2A7A] transition-all duration-300 hover:scale-110 inline-block">
                  create a new account
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="rounded-md shadow-sm space-y-4">
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/90 text-white placeholder-gray-400 focus:outline-none focus:ring-[#511F5C] focus:border-[#511F5C] focus:z-10 sm:text-sm transition-all duration-300"
                    placeholder="Email address"
                  />
                </div>
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-zinc-700 bg-zinc-800/90 text-white placeholder-gray-400 focus:outline-none focus:ring-[#511F5C] focus:border-[#511F5C] focus:z-10 sm:text-sm transition-all duration-300"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#511F5C] focus:ring-[#511F5C] border-zinc-700 rounded bg-zinc-800/90 transition-all duration-300 hover:scale-110"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/reset-password" className="font-medium text-[#511F5C] hover:text-[#6A2A7A] transition-all duration-300 hover:scale-110 inline-block">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#511F5C] hover:bg-[#6A2A7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#511F5C] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(81,31,92,0.5)]"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 