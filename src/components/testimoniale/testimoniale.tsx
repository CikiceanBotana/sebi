"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetURL } from 'utils/api';

interface Testimonial {
  id: number;
  poza: string;
  firma_sau_persoana: string;
  detinator_firma: string;
  testimonial: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

// Update the TestimonialCard component
interface TestimonialCardProps {
  testimonial: Testimonial;
  position: number;
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  isActive,
  isPrev,
  isNext
}) => (
  <div
    className={`absolute transition-all duration-500 w-full max-w-sm
      ${isActive ? 'opacity-100 scale-100 z-20 translate-x-0' : 
        isPrev ? 'opacity-20 scale-90 -translate-x-full z-10' :
        isNext ? 'opacity-20 scale-90 translate-x-full z-10' : 'opacity-0 scale-75 z-0'}`}
  >
    <div className="relative">
      <div className="bg-[#2D1A4A] rounded-lg p-6 shadow-xl border border-[#FAFAFA]/10">
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{
            background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
          }} 
        />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={getAssetURL(testimonial.poza)}
            alt={testimonial.detinator_firma}
            className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-[#FAFAFA]/20"
          />
          <h3 className="text-[#FAFAFA] font-faculty text-xl mb-1 text-center">
            {testimonial.firma_sau_persoana}
          </h3>
          <p className="text-[#FAFAFA]/80 font-montserrat text-sm mb-4 text-center">
            {testimonial.detinator_firma}
          </p>
          <p className="text-[#FAFAFA] font-montserrat text-lg text-center">
            {testimonial.testimonial}
          </p>
        </div>
      </div>
    </div>
  </div>
);

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  children: React.ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, children }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'prev' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-30 
      p-2 rounded-full bg-[#2D1A4A]/80 border border-[#FAFAFA]/10 text-[#FAFAFA] 
      hover:bg-[#9F1E07] transition-colors duration-300`}
  >
    {children}
  </button>
);

interface DotIndicatorProps {
  isActive: boolean;
  onClick: () => void;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`h-3 rounded-full transition-all duration-300 relative
      ${isActive ? 'w-6' : 'w-3'}`}
  >
    <div 
      className={`absolute inset-0 rounded-full ${isActive ? 'opacity-100' : 'opacity-0 hover:opacity-50'} transition-opacity duration-300`}
      style={{
        background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
      }}
    />
    <div 
      className={`absolute inset-0 rounded-full bg-[#FAFAFA]/20 ${isActive ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
    />
  </button>
);

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoplay && testimonials.length > 0) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 8500);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const handlePrevious = (): void => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = (): void => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number): void => {
    setIsAutoplay(false);
    setActiveIndex(index);
  };

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="relative w-full pt-16 pb-16">
      <div className="w-11/12 mx-auto">
        <h2 
          className="text-7xl font-lacquer text-[#FAFAFA] text-center mb-12 relative" 
          style={{
            textShadow: '0 0 20px rgba(250, 250, 250, 0.3)'
          }}
        >
          Testimoniale
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center h-[450px]">
            {testimonials.map((testimonial, index) => {
              const position = (index - activeIndex + testimonials.length) % testimonials.length;
              const isActive = position === 0;
              const isPrev = position === testimonials.length - 1;
              const isNext = position === 1;

              return (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  position={position}
                  isActive={isActive}
                  isPrev={isPrev}
                  isNext={isNext}
                />
              );
            })}
          </div>

          <NavigationButton direction="prev" onClick={handlePrevious}>
            <ChevronLeft className="w-6 h-6" />
          </NavigationButton>
          <NavigationButton direction="next" onClick={handleNext}>
            <ChevronRight className="w-6 h-6" />
          </NavigationButton>

          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <DotIndicator
                key={index}
                isActive={index === activeIndex}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;