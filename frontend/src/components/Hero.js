import React, { useState, useEffect, useCallback, useMemo } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Share Your Story",
    description: "Let your memories live on.",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/15087441/pexels-photo-15087441/free-photo-of-people-with-cellphone-near-lake-on-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Capture Moments",
    description: "Capture and share your life's adventures.",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/4606770/pexels-photo-4606770.jpeg",
    title: "Your Story, Your Way",
    description: "Celebrate the moments that matter most.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let slideInterval;
    if (!isPaused) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(slideInterval);
  }, [isPaused, nextSlide]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    },
    [nextSlide, prevSlide]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const SlideImage = useMemo(
    () =>
      ({ src, alt, className }) =>
        (
          <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe";
            }}
            loading="lazy"
          />
        ),
    []
  );

  return (
    <div
      className="relative w-full overflow-hidden h-[30rem] sm:h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative min-w-full h-full flex-shrink-0 "
          >
            <SlideImage
              src={`${slide.image}?auto=format&fit=crop&w=1920&q=80`}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 ">
              <div className="absolute bottom-4 left-4 text-white pb-4  ">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
            strokeWidth="2"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
