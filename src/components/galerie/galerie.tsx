'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full pt-16 pb-8">
      <div className="w-11/12 mx-auto h-auto py-2 relative">
        <h2 
          className="text-7xl font-lacquer text-[#FAFAFA] text-center mb-8 relative" 
          style={{
            textShadow: '0 0 20px rgba(250, 250, 250, 0.3)'
          }}
        >
          Galerie
        </h2>
        <div className="row">
          <ul className={`relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 transition-all duration-300 ${isOpen ? 'opacity-50' : 'opacity-100'}`}>
            {images.map((image, index) => (
              <li 
                key={index}
                className="relative aspect-square group cursor-pointer"
                style={{ margin: '0 0.877%', marginBottom: '20px' }}
              >
                <div
                  onClick={() => handleImageClick(image)}
                  className="relative w-full h-full overflow-hidden"
                >
                  <img 
                    src={`/galerie/${image}`}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#17012C] opacity-0 group-hover:opacity-70 transition-opacity duration-300">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                      <div className="w-8 h-8 border-2 border-[#FAFAFA] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Plus className="text-[#FAFAFA] w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedImage && (
        <div 
          className={`fixed inset-0 z-50 overflow-y-auto transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="absolute inset-0 bg-[#17012C] bg-opacity-95" onClick={handleClose} />
          <div className="relative min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-11/12 mx-auto">
              <div className="relative p-[2px] rounded-lg" style={{
                background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
              }}>
                <div className="relative w-full h-full rounded-lg" style={{
                  background: '#2D1A4A',
                }}>
                  <div 
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    style={{
                      background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
                    }}
                  />

                  <div className="relative z-10 p-8">
                    <button 
                      onClick={handleClose}
                      className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center z-20"
                    >
                      <div className="relative w-6 h-6">
                        <span className="absolute w-full h-0.5 bg-[#FAFAFA] top-1/2 left-0 transform -rotate-45" />
                        <span className="absolute w-full h-0.5 bg-[#FAFAFA] top-1/2 left-0 transform rotate-45" />
                      </div>
                    </button>

                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2">
                        <div className="relative aspect-[4/3] w-full">
                          <img 
                            src={`/galerie/${selectedImage}`}
                            alt="Selected gallery item"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 text-[#FAFAFA]">
                        <h3 className="text-4xl font-lacquer mb-4">Arta din Cioburi</h3>
                        <p className="font-montserrat">
                          O bucată de artă creată din sticlă reciclată, demonstrând frumusețea 
                          care poate fi găsită în materiale refolosite.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;