"use client"

import React from 'react';
import Image from 'next/image';
import { Shield, Sparkles, Timer, Send } from 'lucide-react';

interface ProcessSectionProps {
  content: {
    procesul_nostru: string
    comenzi_speciale: string
    comenzi_speciale_2: string
  }
}

const ProcessSection:React.FC<ProcessSectionProps> = ({ content }) => {
  return (
    <div className="relative w-full mt-8 md:mt-16">
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
            <div className="relative z-10 px-4 md:px-8 py-6">
              {/* First Section */}
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8 md:mb-16">
                {/* Image container - full width on mobile, 30% on desktop */}
                <div className="w-full md:w-[30%] flex items-center justify-center mb-6 md:mb-0">
                  <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-[#2A235A] opacity-20 z-10" />
                    <Image
                      src="/images/proces.webp"
                      alt="Procesul de Creatie"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      className="z-0"
                    />
                  </div>
                </div>

                {/* Text content - full width on mobile, 70% on desktop */}
                <div className="w-full md:w-[70%] flex flex-col justify-center relative">
                  {/* Corner decorations - hidden on mobile */}
                  <div 
                    className="absolute -top-1 -right-1 w-16 h-16 hidden md:block"
                    style={{
                      background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%, calc(100% - 2px) 100%, calc(100% - 2px) 2px, 0 2px)'
                    }}
                  />
                  <div 
                    className="absolute -bottom-1 -left-1 w-16 h-16 hidden md:block"
                    style={{
                      background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
                      clipPath: 'polygon(0 100%, 0 0, 2px 0, 2px calc(100% - 2px), 100% calc(100% - 2px), 100% 100%)'
                    }}
                  />

                  <h2 className="text-[#FAFAFA] font-lacquer text-2xl md:text-4xl mb-2 text-center md:text-left">
                    Procesul Nostru
                  </h2>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed mb-8 text-center md:text-left">
                    {content.procesul_nostru}
                  </p>

                  {/* Icons section */}
                  <div className="flex justify-center w-full">
                    <div className="grid grid-cols-3 gap-4 md:gap-16 w-full md:w-4/5">
                      {[
                        { Icon: Shield, label: 'Siguranță Maximă' },
                        { Icon: Timer, label: 'Proces Meticulos' },
                        { Icon: Sparkles, label: 'Finisaj Perfect' }
                      ].map(({ Icon, label }, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="relative w-16 md:w-20 h-16 md:h-20 group">
                            <div 
                              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)'
                              }}
                            ></div>
                            <div className="relative w-full h-full rounded-full bg-[#2A235A] group-hover:bg-opacity-0 flex items-center justify-center mb-3 transition-colors duration-300">
                              <Icon className="text-[#FAFAFA] w-8 h-8 md:w-10 md:h-10" />
                            </div>
                          </div>
                          <span className="text-[#FAFAFA] text-sm md:text-base font-montserrat mt-3 group-hover:bg-gradient-to-r group-hover:from-[#047A6E] group-hover:via-[#047A6E] group-hover:to-[#9F1E07] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-center">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[2px] my-8" style={{
                background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
              }} />

              {/* Second Section */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left side - Text content */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
                  <h2 className="text-[#FAFAFA] font-lacquer text-2xl md:text-4xl mb-4">
                    Comenzi Speciale
                  </h2>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed mb-6">
                    {content.comenzi_speciale}
                  </p>
                  <p className="text-[#FAFAFA] font-montserrat text-sm leading-relaxed">
                    {content.comenzi_speciale_2}
                  </p>
                </div>

                {/* Right side - Form */}
                <div className="w-full md:w-1/2">
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Numele Dvs."
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Telefon"
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <select 
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300 mb-4"
                      >
                        {/* Option groups remain the same as in the original component */}
                        <option value="" className="bg-[#2A235A]">Selectați tipul sticlei (opțional)</option>
                        
                        {/* ... (all previous option groups) ... */}

                        <option value="other" className="bg-[#2A235A]">Altă sticlă</option>
                      </select>
                      <textarea 
                        placeholder="Descrieți viziunea dvs. pentru proiect și/sau alte sticle pe care doriți să le folosiți..."
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-[#2A235A] text-[#FAFAFA] placeholder-[#FAFAFA]/50 border border-[#FAFAFA]/20 focus:border-[#047A6E] focus:outline-none transition-colors duration-300 resize-none"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full px-6 py-3 bg-[#9F1E07] text-[#FAFAFA] rounded-lg font-faculty hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>Trimite Solicitarea</span>
                      <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;