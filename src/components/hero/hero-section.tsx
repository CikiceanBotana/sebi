'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SimpleScene = dynamic(() => import('../three/simple-scene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-[#FAFAFA] opacity-50">Loading 3D Model...</div>
    </div>
  ),
});

interface StatsProps {
  label: string;
  value: string | number;
}

const Stats: React.FC<StatsProps> = ({ label, value }) => {
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetValue = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
  const countingDuration = 2000;
  const frameRate = 60;
  const incrementsPerFrame = targetValue / (countingDuration / (1000 / frameRate));
  
  useEffect(() => {
    let currentCount = 0;
    let lastUpdate = 0;
    const interval = 1000 / frameRate;

    const updateCount = (timestamp: number) => {
      if (!lastUpdate) lastUpdate = timestamp;
      
      const delta = timestamp - lastUpdate;
      
      if (delta >= interval) {
        currentCount = Math.min(currentCount + incrementsPerFrame, targetValue);
        setCount(Math.floor(currentCount));
        lastUpdate = timestamp;
      }

      if (currentCount < targetValue) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [targetValue, incrementsPerFrame]);

  const displayValue = typeof value === 'string' && value.includes(',') 
    ? count.toLocaleString()
    : count;

  return (
    <div 
      className="flex flex-col items-center transition-transform duration-75 group"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <p className="text-[#FAFAFA] font-eater text-base md:text-2xl mb-2 text-center whitespace-nowrap">{label}</p>
      <span className="text-[#FAFAFA] font-eater text-3xl md:text-5xl text-center whitespace-nowrap">{displayValue}</span>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column !important;
            padding: 1rem !important;
            margin-top: 2rem !important;
            padding-top: 1rem !important;
          }
          .hero-title-section {
            width: 100% !important;
            margin-top: 0 !important;
            order: 3;
            display: none !important;
          }
          .hero-model-section {
            width: 100% !important;
            height: 75vh !important;
            margin-top: -2rem !important;
            overflow: visible !important;
          }
          .hero-stats-section {
            width: 100% !important;
            margin: 0 0 2rem 0 !important;
            order: 2;
          }
          .hero-stats-section > div {
            width: 100vw !important;
            max-width: none !important;
            margin-left: -1rem !important;
            margin-right: -1rem !important;
          }
          .stats-container {
            flex-direction: row !important;
            justify-content: space-around !important;
            gap: 0.5rem !important;
            padding: 0.25rem 1rem !important;
            width: 100% !important;
          }
          .stats-container p {
            margin-bottom: 0.25rem !important;
          }
          .stats-container > div {
            flex: 1 1 33.333% !important;
            min-width: 0 !important;
            white-space: nowrap !important;
          }
          .mobile-title-cta {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            margin-bottom: 1rem !important;
          }
          .hero-title {
            font-size: 3rem !important;
            text-align: center;
          }
          .hero-cta {
            justify-content: center;
          }
        }
        @media (min-width: 769px) {
          .mobile-title-cta {
            display: none !important;
          }
        }
      `}</style>
      <div className="hero-container relative flex flex-row w-full min-h-screen px-8 -mt-8 overflow-visible">
        <div className="hero-title-section w-1/4 flex flex-col items-start justify-center -mt-24">
          <div className="relative">
            <div 
              className="absolute -inset-6 top-4 rounded-lg z-0"
              style={{
                background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                padding: '2px'
              }}
            >
              <div className="w-full h-full rounded-lg relative" style={{
                background: '#2D1A4A',
              }}>
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  style={{
                    background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
            <div className="relative z-10">
              <h1 
                className="hero-title text-[#FAFAFA] font-anton text-[5.2rem] leading-relaxed transition-transform duration-75 mb-8"
              >
                <span className="block text-[#FAFAFA] font-eater">
                  Arta Din
                </span>
                <span className="block text-[#FAFAFA] font-eater">
                  Amintiri Baute
                </span>
              </h1>
              <div className="hero-cta font-montserrat text-2xl text-[#FAFAFA] whitespace-nowrap mt-4 flex items-center gap-2">
                <span>
                  Intra in{' '}
                  <span className="inline-block">
                    Magazin
                  </span>
                </span>
                <button className="group bg-[#9F1E07] p-1.5 rounded-full hover:bg-[#FAFAFA] transition-colors duration-200 flex items-center justify-center border border-[#FAFAFA] hover:border-[#9F1E07]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="flex items-center justify-center" 
                  >
                    <defs>
                      <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#047A6E" />
                        <stop offset="50%" stopColor="#047A6E" />
                        <stop offset="100%" stopColor="#9F1E07" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M5 12h14 M13 6l6 6-6 6" 
                      className="stroke-[#FAFAFA] group-hover:[stroke:url(#arrow-gradient)] transition-all duration-300"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-model-section w-1/2 flex items-center justify-center overflow-visible">
          <div className="w-full h-full relative overflow-visible">
            <SimpleScene />
          </div>
        </div>

        <div className="hero-stats-section w-1/4 flex flex-col justify-center items-center -mt-24 -ml-12">
          <div className="relative w-[420px]">
            <div 
              className="absolute -inset-6 top-4 rounded-lg z-0 min-h-[80px] md:min-h-[360px]"
              style={{
                background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                padding: '2px'
              }}
            >
              <div className="w-full h-full rounded-lg relative" style={{
                background: '#2D1A4A',
              }}>
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  style={{
                    background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
            <div className="relative z-10 py-8 px-8">
              <div className="stats-container flex flex-col md:flex-col items-center space-y-0 md:space-y-12">
                <Stats 
                  label="Sticle Sparte" 
                  value="157" 
                />
                <Stats 
                  label="Cumparatori" 
                  value="3" 
                />
                <Stats 
                  label="Cafele Baute" 
                  value="47" 
                />
              </div>
              <div className="mobile-title-cta hidden">
                <h1 
                  className="hero-title text-[#FAFAFA] font-anton text-[3rem] leading-relaxed transition-transform duration-75 mb-4 text-center"
                >
                  <span className="block text-[#FAFAFA] font-eater">
                    Arta Din
                  </span>
                  <span className="block text-[#FAFAFA] font-eater">
                    Amintiri Baute
                  </span>
                </h1>
                <div className="hero-cta font-montserrat text-2xl text-[#FAFAFA] whitespace-nowrap mt-4 flex items-center gap-2 justify-center">
                  <span>
                    Intra in{' '}
                    <span className="inline-block">
                      Magazin
                    </span>
                  </span>
                  <button className="group bg-[#9F1E07] p-1.5 rounded-full hover:bg-[#FAFAFA] transition-colors duration-200 flex items-center justify-center border border-[#FAFAFA] hover:border-[#9F1E07]">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="flex items-center justify-center" 
                    >
                      <defs>
                        <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#047A6E" />
                          <stop offset="50%" stopColor="#047A6E" />
                          <stop offset="100%" stopColor="#9F1E07" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M5 12h14 M13 6l6 6-6 6" 
                        className="stroke-[#FAFAFA] group-hover:[stroke:url(#arrow-gradient)] transition-all duration-300"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;