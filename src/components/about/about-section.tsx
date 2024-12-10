import React from 'react';
import Image from 'next/image';
import { Hammer, Star, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="relative w-full -mt-4">
      <div className="w-11/12 mx-auto h-auto py-2 relative">
        {/* Main container with gradient border */}
        <div className="relative p-[2px] rounded-lg" style={{
          background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
        }}>
          {/* Inner content container */}
          <div className="relative w-full h-full rounded-lg" style={{
            background: '#2D1A4A',
          }}>
            {/* Decorative background gradient */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{
                background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
              }}
            />

            {/* Content container */}
            <div className="relative z-10 px-8 py-6">
              <div className="flex gap-8 items-center">
                {/* Text content - 70% width */}
                <div className="w-[70%] flex flex-col justify-center relative">
                  {/* Top right corner border */}
                  <div 
                    className="absolute -top-1 -right-1 w-16 h-16"
                    style={{
                      background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(100% - 2px) 100%, calc(100% - 2px) 2px, 0 2px)'
                    }}
                  />
                  {/* Bottom left corner border */}
                  <div 
                    className="absolute -bottom-1 -left-1 w-16 h-16"
                    style={{
                      background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                      clipPath: 'polygon(0 100%, 0 0, 2px 0, 2px calc(100% - 2px), 100% calc(100% - 2px), 100% 100%)'
                    }}
                  />

                  <h2 className="text-[#FAFAFA] font-lacquer text-4xl mb-2">
                    Despre Noi
                  </h2>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed mb-8">
                    Suntem o echipă pasionată care transformă cioburile de sticlă rătăcite în opere de artă unice. 
                    Fiecare bucată de sticlă are propria sa poveste, iar noi o readucem la viață prin creativitate și dedicare. 
                    Misiunea noastră este să demonstrăm că frumusețea poate fi găsită în cele mai neașteptate locuri.
                  </p>

                  {/* Icons section */}
                  <div className="flex justify-center w-full">
                    <div className="grid grid-cols-3 gap-16 w-4/5">
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 group">
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                            }}
                          ></div>
                          <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                            <Hammer className="text-[#FAFAFA] w-10 h-10" />
                          </div>
                        </div>
                        <span className="text-[#FAFAFA] text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Handmade</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 group">
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                            }}
                          ></div>
                          <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                            <Star className="text-[#FAFAFA] w-10 h-10" />
                          </div>
                        </div>
                        <span className="text-[#FAFAFA] text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Calitate Înaltă</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 group">
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                            }}
                          ></div>
                          <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                            <Heart className="text-[#FAFAFA] w-10 h-10" />
                          </div>
                        </div>
                        <span className="text-[#FAFAFA] text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">Prietenos cu Copiii</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image container - 30% width */}
                <div className="w-[30%] flex items-center justify-center">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#2A235A] opacity-20 z-10" />
                    <Image
                      src="/images/about-us.jpeg"
                      alt="About Us"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      className="z-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;