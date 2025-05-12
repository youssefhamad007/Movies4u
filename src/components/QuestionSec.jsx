import React from 'react'
import Accordioncard from './Acourding'
const QuestionSec = () => {
  return (
    <div className='flex flex-col justify-start items-start pt-[5%] pl-[10%]'>
        <div className='flex flex-col justify-start items-start relative gap-4 w-[94%]'>
            <h1 className=' text-[6vw] md:text-5xl text-white'>Frequently Asked Questions</h1>
            <div className='flex flex-col sm:flex-row gap-4 items-start w-full sm:items-center justify-start sm:justify-between '>
            <h6 className='text-[2vw] md:text-[14px] text-[#999999] max-w-full sm:max-w-[70%]'>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about Movies4u.</h6>
            <button className='askque'>Ask a question</button>
            </div>
        </div>
        <Accordioncard></Accordioncard>
    </div>
  )
}

export default QuestionSec