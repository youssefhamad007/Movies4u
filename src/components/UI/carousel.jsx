"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import { Link } from 'react-router-dom';

const genreIds = {
  Action: 28,
  Adventure: 12,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
  Fantasy: 14,
  'Sci-Fi': 878,
  Thriller: 53,
  Crime: 80,
  Animation: 16,
  Documentary: 99,
  History: 36,
  Music: 10402,
  Mystery: 9648
};

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick
}) => {
  const slideRef = useRef(null);
  const videoRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const { src, button, title, poster } = slide;

  return (
    <div className="[perspective:1000px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col justify-end relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[40vw] max-w-[250px] sm:max-w-[400px] md:max-w-[500px] aspect-square z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform:
            current !== index
              ? "scale(0.80) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}>
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}>
          <div 
            className="absolute inset-0 w-[100%] h-[100%] transition-opacity duration-600 ease-in-out" 
            style={{
              opacity: current === index ? 1 : 0.5,
            }}>
            {isHovered && src ? (
              <iframe
                ref={videoRef}
                src={src}
                title={title}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={poster}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>
        <article className="relative bottom-0 left-0 right-0 p-4 transition-opacity duration-1000 ease-in-out flex justify-between">
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold relative">
            {title}
          </h2>
          <div className="flex justify-start">
            <Link
              to={`/genre/${genreIds[title]}/${encodeURIComponent(title)}`}
              className="py-1 sm:px-4 sm:py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200"
            >
              <span className="sm:hidden">View</span>
              <span className="hidden sm:block">{button}</span>
            </Link>
          </div>
        </article>
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick
}) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}>
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

function Carousel({
  slides
}) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[17vmin] h-[50vmin]"
      aria-labelledby={`carousel-heading-${id}`}>
      <ul
        className="absolute flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full mt-[-55px] sm:mt-[-50px]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}

export default Carousel;
