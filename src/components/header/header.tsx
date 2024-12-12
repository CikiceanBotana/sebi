'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

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
  { name: "Despre noi", path: "/despre-noi" },
  { name: "Contact", path: "/contact" },
];

const Header: React.FC = () => {
  return (
    <header className="relative w-full bg-transparent">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 z-20 relative -ml-28">
            <Link href="/" className="block">
              <div className="relative w-96 h-32">
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

          {/* Audio Visualizer Section */}
          <div className="hidden sm:block absolute left-1/3 transform -translate-x-1/2 z-10">
            <div className="w-48 h-24 flex items-center justify-center">
              <AudioVisualizer />
            </div>
          </div>

          {/* Navigation and Button Section */}
          <div className="hidden sm:flex items-center space-x-8 z-20 relative">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="group relative text-[#FAFAFA] px-3 py-2 transition-colors duration-200 font-lacquer text-xl"
                >
                  <span className="relative bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-1/3 h-[2px] bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] transform -translate-x-1/2 scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
            <button 
              className="text-[#FAFAFA] px-4 py-2 rounded-md border border-[#FAFAFA] font-faculty bg-[#9F1E07] hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200"
              onClick={() => {/* Add your contact button handler here */}}
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;