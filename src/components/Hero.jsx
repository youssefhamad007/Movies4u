import React from 'react'
import { IconPlayerPlayFilled } from '@tabler/icons-react';
const Hero = () => {
  return (
    <div className='flex justify-center flex-col gap-2'>
        <div className='flex justify-center Title'>
            <h1 className='h1 text-[6vw] md:text-[5vw] text-white '>The Best Streaming Experience</h1>
        </div>
        <div className="colcution flex justify-center">
            <p className='text-[1.8vw] md:text-[14px] text-white p text-center'>Movies4u is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With Movies4u, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
        </div>
        <div className='flex justify-center flex-row'>
            <button className='startwatching flex justify-center items-center '><IconPlayerPlayFilled  className='mr-3'/><div className='hiddensmall'>Start Watching Now</div></button>
        </div>
    </div>
  )
}

export default Hero