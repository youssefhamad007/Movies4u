import React, { useState, useEffect } from 'react';
import { InfiniteMovingCardsDemo } from '../components/InfinteCard';
import Hero from '../components/Hero';
import RecomendSec from '../components/RecomendSec';
import ProvideSec from '../components/ProvideSec';
import QuestionSec from '../components/QuestionSec';
import Plans from '../components/Plans';
import FreeTrail from '../components/FreeTrail';
import Loader from '../components/Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (replace with real data loading if needed)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <InfiniteMovingCardsDemo />
      <Hero />
      <RecomendSec />
      <ProvideSec />
      <QuestionSec />
      <Plans />
      <FreeTrail />
    </>
  );
};

export default Home; 