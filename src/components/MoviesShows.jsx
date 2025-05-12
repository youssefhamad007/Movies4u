import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaPlay, FaInfoCircle, FaStar, FaPlus, FaFilm } from 'react-icons/fa';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import FreeTrail from './FreeTrail';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const MainContent = styled.main`
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #040404;
  color: white;
`;

const CarouselContainer = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CarouselTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(to right, #ffffff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ViewAllLink = styled.a`
  color: #a855f7;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    transform: translateX(3px);
  }
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    margin: 0 auto;
  }

  .slick-slide {
    padding: 0 8px;
    display: flex;
    justify-content: center;
  }

  .slick-list {
    margin: 0 -8px;
  }

  .slick-prev, .slick-next {
    z-index: 10;
    width: 40px;
    height: 40px;
    background: rgba(20, 20, 40, 0.7);
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex !important;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #a855f7;
    }

    &:before {
      display: none;
    }
  }

  .slick-prev {
    left: -20px;
  }

  .slick-next {
    right: -20px;
  }
`;

const MovieCard = styled.div`
  position: relative;
  width: 220px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #181828;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  margin: 0 12px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45);
    z-index: 10;

    .overlay {
      opacity: 1;
    }

    .card-buttons {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PosterContainer = styled.div`
  position: relative;
  height: 320px;
  width: 100%;
  flex-shrink: 0;
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
  display: block;
`;

const FallbackPoster = styled.div`
  width: 100%;
  height: 100%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #232344;
  color: #4a4a6a;
  font-size: 3rem;
  transition: all 0.4s ease;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
`;

const CardButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #511F5C;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: #6A2A7A;
  }

  &.play {
    background: white;
    color: #000;
  }
`;

const Rating = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #ffd700;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
`;

const CardContent = styled.div`
  padding: 12px;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 60px;
`;

const MovieTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 5px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: white;
  max-height: 2.6em;
  line-height: 1.3em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #a0a0a0;
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  width: 100%;
  height: 100%;
`;

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <ArrowButton>
        <FaChevronLeft />
      </ArrowButton>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <ArrowButton>
        <FaChevronRight />
      </ArrowButton>
    </div>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  color: white;
  font-size: 1.2rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #a855f7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9333ea;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${props => -props.$currentSlide * 100}%);
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #181818 90%),
    url(${props => props.$bgImage}) no-repeat center center/cover, #181818;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideContent = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  padding: 0 2rem;
  z-index: 2;
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const NavDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.$active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const carouselSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  initialSlide: 0,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

const HeroContainer = styled.div`
  height: 80vh;
  width: 100%;
  position: relative;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), var(--background-color)),
    url('https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  padding: 0 2rem;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: #e5e5e5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #511F5C;
  color: white;
  border: none;
`;

const SecondaryButton = styled(Button)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  border: none;
`;

const FeaturedSlider = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState({});
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide(current => (current === movies.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(current => (current === 0 ? movies.length - 1 : current - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleImageError = (movieId) => {
    setImageError(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Filter out movies without backdrop images
  const validMovies = movies.filter(movie => movie.backdrop_path && !imageError[movie.id]);

  // Debug: Log the backdrop URLs
  useEffect(() => {
    if (validMovies.length > 0) {
      validMovies.forEach(movie => {
        console.log('Backdrop URL:', `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`);
      });
    }
  }, [validMovies]);

  if (validMovies.length === 0) {
    return (
      <SliderContainer>
        <Slide $bgImage="https://via.placeholder.com/1920x1080?text=No+Images+Available">
          <SlideContent>
            <Title>No Featured Movies Available</Title>
            <Description>Please try again later.</Description>
          </SlideContent>
        </Slide>
      </SliderContainer>
    );
  }

  return (
    <SliderContainer>
      <SlideWrapper $currentSlide={currentSlide}>
        {validMovies.map((movie) => (
          <Slide 
            key={movie.id} 
            $bgImage={`${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`}
            onError={() => handleImageError(movie.id)}
          >
            <SlideContent>
              <Title>{movie.title}</Title>
              <Description>{movie.overview}</Description>
              <ButtonGroup>
                <PrimaryButton onClick={() => navigate(`/movie/${movie.id}`)}>
                  <FaPlay /> Play
                </PrimaryButton>
                <SecondaryButton onClick={() => navigate(`/movie/${movie.id}`)}>
                  <FaInfoCircle /> More Info
                </SecondaryButton>
              </ButtonGroup>
            </SlideContent>
          </Slide>
        ))}
      </SlideWrapper>

      <SliderArrow className="prev" onClick={prevSlide}>
        <FaChevronLeft />
      </SliderArrow>
      <SliderArrow className="next" onClick={nextSlide}>
        <FaChevronRight />
      </SliderArrow>

      <SliderNav>
        {validMovies.map((_, index) => (
          <NavDot
            key={index}
            $active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </SliderNav>
    </SliderContainer>
  );
};

const MoviesShows = () => {
  const [movies, setMovies] = useState({
    popular: [],
    trending: [],
    topRated: [],
    upcoming: []
  });
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posterErrors, setPosterErrors] = useState({});
  const [series, setSeries] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch featured movies
      const featuredIds = [299534, 634649, 436270, 414906, 505642]; // Avengers: Endgame, Spider-Man: No Way Home, Black Adam, The Batman, Black Panther: Wakanda Forever
      const featuredPromises = featuredIds.map(id =>
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: { api_key: TMDB_API_KEY }
        })
      );
      const featuredResults = await Promise.all(featuredPromises);
      setFeaturedMovies(featuredResults.map(res => res.data));

      // Fetch other movie categories
      const [popular, trending, topRated, upcoming] = await Promise.all([
        axios.get('https://api.themoviedb.org/3/movie/popular', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: { api_key: TMDB_API_KEY }
        }),
        axios.get('https://api.themoviedb.org/3/trending/movie/week', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: { api_key: TMDB_API_KEY }
        }),
        axios.get('https://api.themoviedb.org/3/movie/top_rated', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: { api_key: TMDB_API_KEY }
        }),
        axios.get('https://api.themoviedb.org/3/movie/upcoming', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: { api_key: TMDB_API_KEY }
        })
      ]);

      setMovies({
        popular: popular.data.results,
        trending: trending.data.results,
        topRated: topRated.data.results,
        upcoming: upcoming.data.results
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(error.response?.data?.status_message || 'Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeries = async () => {
    try {
      const currentYear = new Date().getFullYear();
      let allResults = [];
      // Fetch the first 5 pages (100 series)
      for (let page = 1; page <= 10; page++) {
        const res = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
          params: {
            api_key: TMDB_API_KEY,
            sort_by: 'first_air_date.desc',
            'first_air_date.gte': `${currentYear - 10}`,
            page,
            with_original_language: 'en',
          },
        });
        allResults = allResults.concat(res.data.results);
      }
      // Only include series with posters, names, and a valid first_air_date
      const filtered = allResults.filter(
        show =>
          show.poster_path &&
          show.name &&
          show.first_air_date
      );
      setSeries(filtered);
    } catch {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, []);

  const handleImageError = (movieId) => {
    setPosterErrors(prev => ({
      ...prev,
      [movieId]: true
    }));
  };

  const handlePlayClick = (e, movie) => {
    e.stopPropagation();
    console.log(`Playing movie: ${movie.title}`);
  };

  const handleAddToListClick = (e, movie) => {
    e.stopPropagation();
    console.log(`Added ${movie.title} to watchlist`);
  };

  const renderMovieCard = (movie) => {
    const isValidPoster = movie.poster_path && !posterErrors[movie.id];

    return (
      <MovieCard key={movie.id} as={Link} to={`/movie/${movie.id}`}>
        <PosterContainer>
          {isValidPoster ? (
            <MoviePoster
              src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              onError={() => handleImageError(movie.id)}
            />
          ) : (
            <FallbackPoster>
              <FaFilm />
            </FallbackPoster>
          )}
          <Rating>
            <FaStar /> {movie.vote_average?.toFixed(1)}
          </Rating>
          <Overlay className="overlay">
            <CardButtons className="card-buttons">
              <IconButton
                className="play"
                onClick={(e) => handlePlayClick(e, movie)}
              >
                <FaPlay />
              </IconButton>
              <IconButton onClick={(e) => handleAddToListClick(e, movie)}>
                <FaPlus style={{ color: 'white' }} />
              </IconButton>
            </CardButtons>
          </Overlay>
        </PosterContainer>
        <CardContent>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieInfo>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{movie.vote_average?.toFixed(1)}</span>
          </MovieInfo>
        </CardContent>
      </MovieCard>
    );
  };

  // Filter upcoming movies to only those not yet released
  const today = new Date();
  const unreleasedUpcoming = movies.upcoming.filter(movie => {
    if (!movie.release_date) return false;
    return new Date(movie.release_date) > today;
  });

  if (loading) return <Loader />;
  if (error) {
    return (
      <ErrorContainer>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <RetryButton onClick={fetchMovies}>Try Again</RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <div>
      <FeaturedSlider movies={featuredMovies} />
      
      <MainContent>
        <CarouselContainer>
          <CarouselHeader>
            <CarouselTitle>Popular Movies</CarouselTitle>
            <ViewAllLink as={Link} to="/movies/popular">View All</ViewAllLink>
          </CarouselHeader>
          <StyledSlider {...carouselSettings}>
            {movies.popular.map(renderMovieCard)}
          </StyledSlider>
        </CarouselContainer>

        <CarouselContainer>
          <CarouselHeader>
            <CarouselTitle>Trending Now</CarouselTitle>
            <ViewAllLink as={Link} to="/movies/trending">View All</ViewAllLink>
          </CarouselHeader>
          <StyledSlider {...carouselSettings}>
            {movies.trending.map(renderMovieCard)}
          </StyledSlider>
        </CarouselContainer>

        <CarouselContainer>
          <CarouselHeader>
            <CarouselTitle>Top Rated</CarouselTitle>
            <ViewAllLink as={Link} to="/movies/top-rated">View All</ViewAllLink>
          </CarouselHeader>
          <StyledSlider {...carouselSettings}>
            {movies.topRated.map(renderMovieCard)}
          </StyledSlider>
        </CarouselContainer>

        <CarouselContainer>
          <CarouselHeader>
            <CarouselTitle>Coming Soon</CarouselTitle>
            <ViewAllLink as={Link} to="/movies/upcoming">View All</ViewAllLink>
          </CarouselHeader>
          <StyledSlider {...carouselSettings}>
            {unreleasedUpcoming.map(renderMovieCard)}
          </StyledSlider>
        </CarouselContainer>

        <CarouselContainer>
          <CarouselHeader>
            <CarouselTitle>TV Series</CarouselTitle>
            <ViewAllLink as={Link} to="/series/all">View All</ViewAllLink>
          </CarouselHeader>
          <StyledSlider {...carouselSettings}>
            {series.map(show => (
              <MovieCard key={show.id} as={Link} to={`/series/${show.id}`}>
                <PosterContainer>
                  <MoviePoster
                    src={`${TMDB_IMAGE_BASE_URL}${show.poster_path}`}
                    alt={show.name}
                  />
                </PosterContainer>
                <CardContent>
                  <MovieTitle>{show.name}</MovieTitle>
                  <MovieInfo>
                    <span>{show.first_air_date?.slice(0, 4) || 'N/A'}</span>
                    <span>{show.vote_average?.toFixed(1)}</span>
                  </MovieInfo>
                </CardContent>
              </MovieCard>
            ))}
          </StyledSlider>
        </CarouselContainer>
      </MainContent>
      <FreeTrail />
    </div>
  );
};

export default MoviesShows; 