import React from 'react'
import PlansCards from './PlansCards'

const Plans = () => {
  return (
    <section className='flex flex-col justify-start items-start pt-[10%] pl-[10%]'>
    <div className='flex flex-col justify-start items-start relative gap-2'>
        <h1 className=' text-[5vw] md:text-4xl text-white'>Choose the plan that's right for you</h1>
        <h6 className='text-[1.8vw] md:text-[14px] text-[#999999]'>Join Movies4u and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!</h6>
    </div>
    <PlansCards></PlansCards>
    </section>
  )
}

export default Plans