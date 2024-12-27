'use client';

import React, { useState } from 'react';
import { Music2, X } from 'lucide-react';

interface Song {
  title: string;
  path: string;
}

const songs: Song[] = [
  { title: "Casanova", path: "/music/casanova.mp3" },
  // Add more songs here
];

interface MusicControlsProps {
  currentSong: Song;
  onSongChange: (song: Song) => void;
}

const MusicControls: React.FC<MusicControlsProps> = ({ currentSong, onSongChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="group"
        aria-label="Choose Music"
      >
        <div className="relative w-5 h-5">
          <Music2 
            className="absolute inset-0 w-5 h-5 stroke-[#FAFAFA] transition-all duration-300 group-hover:opacity-0" 
          />
          <Music2 
            className="absolute inset-0 w-5 h-5 stroke-[url(#music-gradient)] opacity-0 transition-all duration-300 group-hover:opacity-100" 
          />
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="music-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047A6E" />
                <stop offset="50%" stopColor="#047A6E" />
                <stop offset="100%" stopColor="#9F1E07" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[99998]"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99999]"
            onClick={e => e.stopPropagation()}
          
          >
            <div className="relative bg-[#2D1A4A] border border-[#FAFAFA]/10 rounded-lg w-64 p-6">
              <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-lacquer text-[#FAFAFA]">
                    Alege Melodia
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-2">
                  {songs.map((song) => (
                    <button
                      key={song.path}
                      onClick={() => {
                        onSongChange(song);
                        setIsModalOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group
                                ${currentSong.path === song.path 
                                  ? 'bg-[#047A6E]/20 text-[#FAFAFA]' 
                                  : 'hover:bg-[#FAFAFA]/5 text-[#FAFAFA]/80 hover:text-[#FAFAFA]'
                                }`}
                    >
                      <div className="flex items-center gap-3">
                        <Music2 
                          size={16} 
                          className={`${currentSong.path === song.path 
                            ? 'stroke-[#047A6E]' 
                            : 'stroke-current group-hover:stroke-[#047A6E]'
                          } transition-colors duration-200`}
                        />
                        <span className="font-montserrat">{song.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicControls;