import './App.css'
import './global.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CarouselDemo from './components/Caroselmovies'
import Support from './pages/Support'
import MoviesShowsPage from './pages/MoviesShows'
import MoviesListPage from './components/MoviesListPage'
import SeriesDetailsPage from './components/SeriesDetailsPage'
import SeriesListPage from './components/SeriesListPage'
import MovieDetailsPage from './components/MovieDetailsPage'
import GenreListPage from './components/GenreListPage'
import Home from './pages/Home'
import Subscriptions from './pages/Subscriptions'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import AccountForm from './components/AccountForm'
import SubscriptionForm from './components/SubscriptionForm'
import PageTransition from './components/PageTransition'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/movies" element={<PageTransition><CarouselDemo /></PageTransition>} />
        <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
        <Route path="/movies-shows" element={<PageTransition><MoviesShowsPage /></PageTransition>} />
        <Route path="/movies/:category" element={<PageTransition><MoviesListPage /></PageTransition>} />
        <Route path="/series/all" element={<PageTransition><SeriesListPage /></PageTransition>} />
        <Route path="/series/:id" element={<PageTransition><SeriesDetailsPage /></PageTransition>} />
        <Route path="/movie/:id" element={<PageTransition><MovieDetailsPage /></PageTransition>} />
        <Route path="/genre/:genreId/:genreName" element={<PageTransition><GenreListPage /></PageTransition>} />
        <Route path="/subscriptions" element={<PageTransition><Subscriptions /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path="/account" element={<PageTransition><AccountForm /></PageTransition>} />
        <Route path="/manage-subscription" element={<PageTransition><SubscriptionForm /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <AnimatedRoutes />
      </div>
      <Footer />
    </Router>
  )
}

export default App
