"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "./UI/carousel";

const TMDB_API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";
const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2Y0YzM5YzM5ZGUyMDEyYzM5YzM5ZGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwiaWF0IjoxNzE4MjM5MjI5LCJleHAiOjE3MTgzMjU2Mjl9.8c247ea0b4b56ed2ff7d41c9a833aa77";
const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// Specific movie IDs for popular blockbusters
const popularMovies = {
  "Action": 299534, // Avengers: Endgame
  "Adventure": 634649, // Spider-Man: No Way Home
  "Comedy": 502356, // The Super Mario Bros. Movie
  "Drama": 76600, // Avatar: The Way of Water
  "Horror": 758323, // The Pope's Exorcist
  "Romance": 447365, // Guardians of the Galaxy Vol. 3
  "Fantasy": 122, // The Lord of the Rings
  "Sci-Fi": 693134, // Dune: Part Two
  "Thriller": 603692, // John Wick: Chapter 4
  "Crime": 787699, // Wonka
  "Animation": 1011985, // Kung Fu Panda 4
  "Documentary": 1098110, // Taylor Swift: The Eras Tour
  "History": 1011679, // Shogun
  "Music": 1098110, // Taylor Swift: The Eras Tour
  "Mystery": 934433 // Smile
};

function CarouselDemo() {
  const [genreMovies, setGenreMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesAndTrailers = async () => {
      try {
        setLoading(true);
        const genreData = {};
        
        for (const [genre, movieId] of Object.entries(popularMovies)) {
          // Fetch specific movie details
          const { data: movie } = await axios.get(`${TMDB_API_URL}/movie/${movieId}`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY }
          });

          // Fetch movie's trailer
          const { data: videoData } = await axios.get(`${TMDB_API_URL}/movie/${movieId}/videos`, {
            headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
            params: { api_key: TMDB_API_KEY }
          });

          // Find the first trailer
          const trailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");

          genreData[genre] = {
            title: genre,
            button: ">",
            src: trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}` : null,
            poster: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
          };
        }

        setGenreMovies(genreData);
        setError(null);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndTrailers();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  const slideData = Object.values(genreMovies);

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}

export default CarouselDemo;
