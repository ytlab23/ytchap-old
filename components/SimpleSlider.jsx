'use client';

import { useState } from 'react';
import { BiTime } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { IoStatsChart, IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { RiSettings4Fill } from 'react-icons/ri';

const icons = {
  time: <BiTime className="w-6 h-6" />,
  accessibility: <FaUserFriends className="w-6 h-6" />,
  analytics: <IoStatsChart className="w-6 h-6" />,
  automation: <RiSettings4Fill className="w-6 h-6" />
};

const SimpleSlider = ({ features }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + features.length) % features.length);
  };

  const iconTypes = ['time', 'accessibility', 'analytics', 'automation'];

  return (
    <div className="relative w-full max-w-[800px] mx-auto mt-8">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {features.map((feature, indx) => (
            <div key={feature.title} className="flex-none w-full">
              <div className="px-4 md:px-8">
                <div className="bg-[#111111] rounded-2xl shadow-lg p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl border border-zinc-800">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#9333EA] to-[#4F46E5] rounded-xl shadow-md text-white">
                      {icons[iconTypes[indx % 4]]}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-zinc-300 text-base md:text-lg leading-relaxed">{feature.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className={`absolute -left-4 md:left-2 top-[35%] -translate-y-1/2 bg-[#111111] hover:bg-zinc-900 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 border border-zinc-800 ${
          activeIndex === 0 ? 'opacity-0' : 'opacity-100'
        }`}
        disabled={activeIndex === 0}
        aria-label="Previous slide"
      >
        <IoChevronBackSharp className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute -right-4 md:right-2 top-[35%] -translate-y-1/2 bg-[#111111] hover:bg-zinc-900 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 border border-zinc-800 ${
          activeIndex === features.length - 1 ? 'opacity-0' : 'opacity-100'
        }`}
        disabled={activeIndex === features.length - 1}
        aria-label="Next slide"
      >
        <IoChevronForwardSharp className="w-5 h-5 text-white" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === activeIndex 
                ? 'w-8 bg-gradient-to-r from-[#9333EA] to-[#4F46E5]' 
                : 'w-2 bg-zinc-800 hover:bg-zinc-700'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
