import React from 'react'
import { Link } from 'react-router-dom'

const FreeTrail = () => {
  return (
    <div
      className="h-60 flex flex-col md:flex-row justify-center md:justify-between items-center max-w-[2000px]  mx-auto  my-35 text-white same rounded-2xl px-8 sm:p-8 md:p-10"
      style={{ 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backdropFilter: 'blur(5px)' }}
    >
      <div className="flex flex-col space-y-3 ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Start your free trial today!
        </h1>
        <p className="text-sm sm:text-base text-gray-300">
          This is a clear and concise call to action that encourages users to sign up for a free trial of Movies4u.
        </p>
      </div>
      <Link
        to="/signup"
        className="mt-4 md:mt-0 bg-[#511F5C] hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
      >
        Start a Free Trial
      </Link>
    </div>
  )
}

export default FreeTrail