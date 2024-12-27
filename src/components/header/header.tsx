"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CartIcon } from './CartComponents';
import { Menu, X } from 'lucide-react';

const AudioVisualizer = dynamic(() => import('./AudioVisualizer'), {
  ssr: false,
  loading: () => (
    <div className="w-48 h-24 flex items-center justify-center">
      <div className="text-[#FAFAFA] opacity-50">Loading...</div>
    </div>
  )
});

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Acasa", path: "/" },
  { name: "Magazin", path: "/magazin" },
  { name: "Despre noi", path: "/#despre-noi" },
  { name: "Contact", path: "/contact" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const sectionId = path.split('#')[1];
      scrollToSection(sectionId);
    }
  };

  return (
    <header className="relative w-full bg-transparent">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 relative z-10 sm:-ml-28">
            <Link href="/" className="block">
              <div className="relative w-48 sm:w-96 h-16 sm:h-32">
                <Image
                  src="/logo2.png"
                  alt="Arta Din Cioburi Ratacite Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Audio Visualizer */}
          <div className="hidden sm:block absolute left-1/3 transform -translate-x-1/2 z-20">
            <div className="w-48 h-24 flex items-center justify-center">
              <AudioVisualizer />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center sm:hidden">
            <CartIcon />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 ml-2"
            >
              <Menu className="w-8 h-8 text-[#FAFAFA]" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center z-20 relative">
            <div className="flex space-x-8 mr-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="group relative text-[#FAFAFA] px-3 py-2 transition-colors duration-200 font-lacquer text-xl"
                >
                  <span className="relative bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-1/3 h-[2px] bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] transform -translate-x-1/2 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
            <CartIcon />
            <button 
              className="text-[#FAFAFA] px-4 py-2 rounded-md border border-[#FAFAFA] font-faculty bg-[#9F1E07] hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-[#17012C] z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-200"
          >
            <X size={24} />
          </button>

          {/* Mobile Navigation Links */}
          <div className="mt-16 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="text-[#FAFAFA] font-lacquer text-xl py-2 hover:text-[#047A6E] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Audio Visualizer */}
          <div className="mt-8 w-full">
            <AudioVisualizer />
          </div>

          {/* Mobile Contact Button */}
          <button 
            className="mt-auto w-full text-[#FAFAFA] px-4 py-2 rounded-md border border-[#FAFAFA] font-faculty bg-[#9F1E07] hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200"
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;