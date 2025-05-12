import React from 'react'
import ProvideCards from './ProvideCards'

const ProvideSec = () => {
  return (
    <div className='flex flex-col justify-start items-start pt-[2%] pl-[10%]'>
        <div className='flex flex-col justify-start items-start relative gap-4'>
            <h1 className=' text-[4vw] md:text-4xl text-white'>We Provide you streaming experience across various devices.</h1>
            <h6 className='text-[1.5vw] md:text-[14px] text-[#999999]'>With Movies4u, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment.</h6>
        </div>
        <ProvideCards></ProvideCards>
    </div>
  )
}

export default ProvideSec