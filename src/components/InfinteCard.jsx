"use client";

import React, { useState, useEffect } from "react";
import { InfiniteMovingCards } from "./UI/infinite-moving-cards";
import axios from 'axios';

export function InfiniteMovingCardsDemo() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'ee81cc9be5f029e53fc1d34ac9f52d27';
  const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTgxY2M5ZjAyOWU1M2ZjMWQzNGFjOWY1MmQyNyIsIm5iZiI6MS43NDYzOTMxODU5NTUwMDAyZSs5LCJzdWIiOiI2ODE3ZDg2MWQ2OWJjNzQ3MTRhMjE2ZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bM7yLuGUENpVrgOJq74z4rsVBgaVKsL4yBq0ZG7OghE';
  const API_URL = 'https://api.themoviedb.org/3/';
  const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const allMovies = [];
        // Fetch multiple pages to ensure we have enough movies
        for (let page = 1; page <= 10; page++) {
          const { data } = await axios.get(`${API_URL}movie/popular`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            params: { api_key: API_KEY, page },
          });
          // Only add movies that have poster paths
          const moviesWithPosters = data.results.filter(movie => movie.poster_path);
          allMovies.push(...moviesWithPosters);
        }
        setMovies(allMovies);
        setError(null);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Function to create image arrays using loops
  const createImageArray = (startIndex, count) => {
    return Array.from({ length: count }, (_, i) => {
      const movie = movies[startIndex + i];
      return {
        key: `movie-${startIndex + i}`,
        image: movie?.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null,
        alt: movie?.title || `Movie ${startIndex + i + 1}`
      };
    });
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="text-white text-center py-10">No movies found</div>;
  }

  // Create four arrays of 9 images each
  const images1 = createImageArray(0, 9);
  const images2 = createImageArray(9, 9);
  const images3 = createImageArray(18, 9);
  const images4 = createImageArray(27, 9);

  return (
    <>
      <div className="[mask-image:linear-gradient(to_top,transparent,white_30%,black_70%,transparent)] containermovie">
        <div className="flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={images1} direction="right" speed="slow" />
          <InfiniteMovingCards items={images2} direction="left" speed="slow" />
          <InfiniteMovingCards items={images3} direction="right" speed="slow" />
          <InfiniteMovingCards items={images4} direction="left" speed="slow" />
        </div>
      </div>
      <div className="shadow"></div>
    </>
  );
}
