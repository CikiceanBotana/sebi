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
  bassValue: number;
}

const Stats: React.FC<StatsProps> = ({ label, value, bassValue }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame: number;
    const updatePosition = () => {
      const time = Date.now() / 50;
      const vibrationAmount = bassValue * 10;
      setPosition({
        x: Math.sin(time) * vibrationAmount,
        y: Math.cos(time) * vibrationAmount
      });
      animationFrame = requestAnimationFrame(updatePosition);
    };
    animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [bassValue]);

  return (
    <div 
      className="flex flex-col items-center transition-transform duration-75 group"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <p className="text-[#FAFAFA] font-lacquer text-2xl mb-2 text-center">{label}</p>
      <span className="text-[#FAFAFA] font-lacquer text-5xl text-center">{value}</span>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [bassValue, setBassValue] = useState(0);
  const [titlePosition, setTitlePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame: number;
    const updatePosition = () => {
      const time = Date.now() / 50;
      const vibrationAmount = bassValue * 5;
      setTitlePosition({
        x: Math.sin(time) * vibrationAmount,
        y: Math.cos(time) * vibrationAmount
      });
      animationFrame = requestAnimationFrame(updatePosition);
    };
    animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [bassValue]);

  const handleBassUpdate = (value: number) => {
    setBassValue(value);
  };

  return (
    <div className="relative flex flex-row w-full min-h-screen px-8 -mt-8 overflow-visible">
      <div className="w-1/4 flex flex-col items-start justify-center -mt-24">
        <div className="relative">
          {/* Title container with gradient border */}
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
              className="text-[#FAFAFA] font-anton text-8xl leading-tight transition-transform duration-75 mb-8"
              style={{
                transform: `translate(${titlePosition.x}px, ${titlePosition.y}px)`
              }}
            >
              <span className="block text-[#FAFAFA]">
                Arta Din
              </span>
              <span className="block text-[#FAFAFA]">
                Cioburi Ratacite
              </span>
            </h1>
            <div className="font-montserrat text-2xl text-[#FAFAFA] whitespace-nowrap mt-4 flex items-center gap-2">
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

      <div className="w-1/2 flex items-center justify-center overflow-visible">
        <div 
          className="w-full h-full relative overflow-visible transition-transform duration-75"
          style={{
            transform: `scale(${1 + bassValue * 0.1})`
          }}
        >
          <SimpleScene bassValue={bassValue} />
        </div>
      </div>

      <div className="w-1/4 flex flex-col justify-center items-center -mt-24 -ml-12">
        <div className="relative w-[420px]">
          {/* Stats container with gradient border */}
          <div 
            className="absolute -inset-6 top-4 rounded-lg z-0 min-h-[360px]"
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
            <div className="flex flex-col items-center space-y-12">
              <Stats 
                label="Arta Vanduta" 
                value="157" 
                bassValue={bassValue}
              />
              <Stats 
                label="Cumparatori" 
                value="89" 
                bassValue={bassValue}
              />
              <Stats 
                label="Sticle Reciclate" 
                value="1,234" 
                bassValue={bassValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;