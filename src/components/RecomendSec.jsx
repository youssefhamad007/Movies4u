import React, { useState } from "react";
import CarouselDemo from "./Caroselmovies";

const RecomendSec = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePrevious = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      const handleNext = () => {
        if (currentPage < 3) {
          setCurrentPage(currentPage + 1);
        }
      };
  return (
    <section className='flex flex-col justify-start items-start pt-[10%] pl-[10%]'>
    <div className='flex flex-col justify-start items-start relative gap-2'>
        <h1 className=' text-[5vw] md:text-4xl text-white'>Explore our wide variety of categories</h1>
        <h6 className='text-[1.8vw] md:text-[14px] text-[#999999]'>Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</h6>
    </div>
    <CarouselDemo></CarouselDemo>
    </section>
  )
}

export default RecomendSec