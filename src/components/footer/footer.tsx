"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Instagram, ArrowRight } from 'lucide-react';

const AccordionSection = ({ 
  title, 
  children, 
  isOpen, 
  onToggle 
}: {
  title: string, 
  children: React.ReactNode, 
  isOpen: boolean, 
  onToggle: () => void
}) => {
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial mobile state
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      if (!isMobile) {
        // Always fully open on desktop
        setHeight(contentRef.current.scrollHeight);
      } else {
        // Mobile: set height based on open/closed state
        setHeight(isOpen ? contentRef.current.scrollHeight : 0);
      }
    }
  }, [isOpen, isMobile]);

  return (
    <div>
      <div 
        className="flex justify-between items-center cursor-pointer md:cursor-default"
        onClick={onToggle}
      >
        <h3 className="text-[#FAFAFA] font-lacquer text-2xl mb-0 md:mb-6">{title}</h3>
        <span className="md:hidden">
          {isOpen ? '−' : '+'}
        </span>
      </div>
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible"
        style={{ 
          height: `${height}px`,
          opacity: height > 0 ? 1 : 0,
          marginTop: height > 0 ? '1rem' : 0,
        }}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <footer className="relative w-full px-4 md:px-8 pb-12">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute -inset-0 rounded-t-lg z-0"
          style={{
            background: '#2D1A4A',
            border: '1px solid rgba(250,250,250,0.1)',
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
            style={{
              background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
            }}
          />
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between">
        {/* Left Section - Navigation */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <AccordionSection
            title="Navigare"
            isOpen={activeSection === 'navigare'}
            onToggle={() => toggleSection('navigare')}
          >
            <nav className="flex flex-col space-y-4">
              {['Acasa', 'Despre Noi', 'Magazin', 'Blog', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-[#FAFAFA] font-montserrat text-lg group flex items-center"
                >
                  <span className="relative bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {item}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#047A6E]" />
                </a>
              ))}
            </nav>
          </AccordionSection>
        </div>

        {/* Right Section - Contact & Form */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Contact Info */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <AccordionSection
                title="Contact"
                isOpen={activeSection === 'contact'}
                onToggle={() => toggleSection('contact')}
              >
                <div className="space-y-4">
                  <a 
                    href="mailto:contact@examplu.com" 
                    className="text-[#FAFAFA] font-montserrat text-lg flex items-center group"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    <span className="relative bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text group-hover:text-transparent transition-all duration-300">
                      contact@examplu.com
                    </span>
                  </a>
                  <a 
                    href="https://www.instagram.com/sippinzzz/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#FAFAFA] font-montserrat text-lg flex items-center group"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    <span className="relative bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text group-hover:text-transparent transition-all duration-300">
                      @sippinz
                    </span>
                  </a>
                </div>
              </AccordionSection>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-1/2">
              <AccordionSection
                title="Trimite un mesaj"
                isOpen={activeSection === 'mesaj'}
                onToggle={() => toggleSection('mesaj')}
              >
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-transparent border border-[#FAFAFA]/10 rounded-lg text-[#FAFAFA] font-montserrat focus:outline-none focus:border-[#047A6E] transition-colors duration-300"
                  />
                  <textarea
                    placeholder="Mesajul tau"
                    rows={3}
                    className="w-full px-4 py-2 bg-transparent border border-[#FAFAFA]/10 rounded-lg text-[#FAFAFA] font-montserrat focus:outline-none focus:border-[#047A6E] transition-colors duration-300"
                  />
                  <button 
                    type="submit"
                    className="w-full px-6 py-2 bg-[#9F1E07] text-[#FAFAFA] rounded-lg font-faculty hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200 border border-[#FAFAFA] hover:border-[#9F1E07]"
                  >
                    Trimite
                  </button>
                </form>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-8 md:mt-12 pt-6 border-t border-[#FAFAFA]/10">
        <div className="text-center space-y-1">
          <p className="text-[#FAFAFA]/60 font-montserrat text-sm md:text-base">
            © 2024 Sippinz. Toate drepturile rezervate.
          </p>
          <p className="text-[#FAFAFA]/40 font-montserrat text-xs md:text-sm">
            Creat de TZ Intelligence 28
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;