import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './SupportPage.css';
import axios from 'axios';
import QuestionSec from './QuestionSec';
import FreeTrail from './FreeTrail';

const TMDB_API_KEY = '8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzI0N2VhMGI0YjU2ZWQyZmY3ZDQxYzlhODMzYWE3NyIsInN1YiI6IjY2M2M5ZjM5YzM5MjY2MDEyYjM5YzM5MiIsInN1YXRlIjoiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8c247ea0b4b56ed2ff7d41c9a833aa77';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SupportPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agree, setAgree] = useState(false);
  const [moviePosters, setMoviePosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageSent, setMessageSent] = useState(false);

  // Fetch movies for the image grid
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch top rated movies
        const topRatedResponse = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated',
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            },
            params: {
              api_key: TMDB_API_KEY,
              language: 'en-US',
              page: 1,
            },
          }
        );

        // Fetch upcoming movies
        const upcomingResponse = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming',
          {
            headers: {
              Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            },
            params: {
              api_key: TMDB_API_KEY,
              language: 'en-US',
              page: 1,
            },
          }
        );

        // Combine and shuffle the movies
        const allMovies = [
          ...topRatedResponse.data.results.slice(0, 5),
          ...upcomingResponse.data.results.slice(0, 4)
        ].sort(() => Math.random() - 0.5);

        // Get first 9 movies for the grid
        const posters = allMovies.map(movie => ({
          id: movie.id,
          poster_path: movie.poster_path,
          title: movie.title
        }));

        setMoviePosters(posters);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle phone number change
  const handlePhoneChange = (value) => {
    console.log('Phone number changed:', value);
    setPhoneNumber(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, message: '' }));
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 2000);
  };

  return (
    <section className="bg-[transparent] text-white py-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        <div className="flex flex-col md:flex-row gap-20 items-center ">
          {/* Left Section: Welcome Message and Image Grid */}
          <div className="w-full md:w-1/3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Welcome to our support page!
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              We're here to help you with any problems you may be having with our product.
            </p>
            <div className="grid grid-cols-3 gap-2 container-ph">
              {loading ? (
                // Loading placeholders
                Array(9).fill(null).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-24 bg-gray-800 rounded-md flex items-center justify-center text-gray-400 support-image-placeholder"
                  >
                    Loading...
                  </div>
                ))
              ) : (
                // Movie posters
                moviePosters.map((movie) => (
                  <div
                    key={movie.id}
                    className="w-full h-24 rounded-md overflow-hidden"
                  >
                    <img
                      src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="w-full md:w-2/3 flex items-center bg-[#0F0F0F] rounded border border-[#262626]">
            <form onSubmit={handleSubmit} className="w-full space-y-4 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='flex flex-col gap-2'>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="w-full p-3 bg-[#141414] text-white rounded-md placeholder-[#999999] support-input"
                    required
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="w-full p-3 bg-gray-900 text-white rounded-md placeholder-[#999999] support-input"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='flex flex-col gap-2'>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="w-full p-3 bg-gray-900 text-white rounded-md placeholder-[#999999] support-input"
                    required
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label>Phone Number</label>
                  <PhoneInput
                    international
                    defaultCountry="ID"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter Phone"
                    className="w-full support-phone-input"
                    inputProps={{
                      className: 'support-phone-input-field',
                      required: true,
                    }}
                    countrySelectProps={{
                      className: 'support-phone-input-button',
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter Your Message"
                  className="w-full p-3 bg-[#141414] text-white rounded-md placeholder-[#999999] support-textarea h-32 resize-none"
                  required
                />
                {messageSent && (
                  <span className="text-green-400 text-sm mt-1">Message sent!</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="h-4 w-4 text-purple-600 rounded support-checkbox focus:ring-purple-500"
                  required
                />
                <label className="text-sm text-gray-400">
                  I agree with{' '}
                  <a href="#" className="text-purple-400 hover:underline">
                    Terms of Use and Privacy Policy
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={!agree}
                className={`w-full sm:w-auto py-2 px-6 rounded-lg text-white font-semibold transition-colors duration-200 ${
                  agree
                    ? 'bg-[#511F5C] hover:bg-[#6A2A7A]'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <QuestionSec />
      <FreeTrail />
    </section>
  );
};

export default SupportPage; 