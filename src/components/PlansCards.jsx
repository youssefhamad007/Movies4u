import React from 'react';
import { GlareCard } from "./UI/glarecard";
import { Link } from 'react-router-dom';

const PlansCards = () => {
  return (
    <div className='flex flex-col sm:flex-row flex-wrap justify-between items-center py-12 w-[90%]'>
      <GlareCard className="flex flex-col items-center justify-center w-full max-w-[300px] sm:max-w-[25vw] text-white">
        <div className='flex flex-col items-start justify-start w-full space-y-6 px-6 py-8'>
          <div className='flex flex-col items-start justify-start text-start'>
            <h1 className='text-2xl sm:text-[3vw] md:text-[2vw] font-bold'>Basic Plan</h1>
            <h6 className='text-sm sm:text-[1vw] mt-2 text-[#999999]'>Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.</h6>
          </div>
          <div className='flex flex-row gap-2 self-start items-center'>
            <h1 className='text-2xl sm:text-[3vw] md:text-[2vw] font-semibold'>$9.99</h1>
            <h6 className='text-sm'>/month</h6>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10'>
            <Link to="/subscriptions" className='w-full sm:w-[160px] relative z-10'>
              <button className='bg-[#141414] w-full h-10 text-white border rounded border-[#262626] text-sm sm:text-[1vw] transition-all duration-200 hover:bg-[#1A1A1A] hover:scale-105 hover:shadow-lg hover:shadow-[#262626]/20 active:scale-95'>Start Free Trial</button>
            </Link>
            <Link to="/subscriptions" className='w-full sm:w-[140px] relative z-10'>
              <button className='bg-[#511F5C] w-full h-10 text-white border rounded border-transparent text-sm sm:text-[1vw] transition-all duration-200 hover:bg-[#6A2A7A] hover:scale-105 hover:shadow-lg hover:shadow-[#511F5C]/20 active:scale-95'>Choose Plan</button>
            </Link>
          </div>
        </div>
      </GlareCard>
      <GlareCard className="flex flex-col items-center justify-center w-full max-w-[300px] sm:max-w-[25vw] text-white">
        <div className='flex flex-col items-center justify-center w-full space-y-6 px-6 py-8'>
          <div className='flex flex-col items-start justify-center text-start'>
            <h1 className='text-2xl sm:text-[2.7vw] md:text-[2vw] font-bold'>Standard Plan</h1>
            <h6 className='text-sm sm:text-[1vw] mt-2 text-[#999999]'>Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.</h6>
          </div>
          <div className='flex flex-row gap-2 self-start items-center'>
            <h1 className='text-2xl sm:text-[3vw] md:text-[2vw] font-semibold'>$12.99</h1>
            <h6 className='text-sm'>/month</h6>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10'>
            <Link to="/subscriptions" className='w-full sm:w-[160px] relative z-10'>
              <button className='bg-[#141414] w-full h-10 text-white border rounded border-[#262626] text-sm sm:text-[1vw] transition-all duration-200 hover:bg-[#1A1A1A] hover:scale-105 hover:shadow-lg hover:shadow-[#262626]/20 active:scale-95'>Start Free Trial</button>
            </Link>
            <Link to="/subscriptions" className='w-full sm:w-[140px] relative z-10'>
              <button className='bg-[#511F5C] w-full h-10 text-white border rounded border-transparent text-sm sm:text-[1vw] transition-all duration-200 hover:bg-[#6A2A7A] hover:scale-105 hover:shadow-lg hover:shadow-[#511F5C]/20 active:scale-95'>Choose Plan</button>
            </Link>
          </div>
        </div>
      </GlareCard>
      <GlareCard className="flex flex-col items-center justify-center w-full max-w-[300px] sm:max-w-[25vw] text-white">
        <div className='flex flex-col items-center justify-center w-full space-y-6 px-6 py-8'>
          <div className='flex flex-col items-start justify-center text-start'>
            <h1 className='text-2xl sm:text-[2.6vw] md:text-[2vw] font-bold'>Premium Plan</h1>
            <h6 className='text-sm sm:text-[1vw] mt-2 text-[#999999]'>Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.</h6>
          </div>
          <div className='flex flex-row gap-2 self-start items-center'>
            <h1 className='text-2xl sm:text-[3vw] md:text-[2vw] font-semibold'>$15.99</h1>
            <h6 className='text-sm'>/month</h6>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 w-full items-center justify-center relative z-10'>
            <Link to="/subscriptions" className='w-full sm:w-[160px] relative z-10'>
              <button className='bg-[#141414] w-full h-10 text-white border rounded border-[#262626] text-sm sm:text-[1vw] transition-all duration-200 hover:bg-[#1A1A1A] hover:scale-105 hover:shadow-lg hover:shadow-[#262626]/20 active:scale-95'>Start Free Trial</button>
            </Link>
            <Link to="/subscriptions" className='w-full sm:w-[140px] relative z-10'>
              <button className='bg-[#511F5C] w-full h-10 text-white border rounded border-transparent text-sm sm:text-[1vw] transition-all duration-200 hover:bg-[#6A2A7A] hover:scale-105 hover:shadow-lg hover:shadow-[#511F5C]/20 active:scale-95'>Choose Plan</button>
            </Link>
          </div>
        </div>
      </GlareCard>
    </div>
  );
};

export default PlansCards;