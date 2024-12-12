import React, { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';

interface StoreItemProps {
  title: string;
  price: number;
  imageUrl: string;
  backgroundImageUrl?: string;
  bottleType?: string;
  size?: string;
}

const StoreItem: React.FC<StoreItemProps> = ({
  title,
  price,
  imageUrl,
  backgroundImageUrl = '/produse/Logo.webp',
  bottleType = 'Jack Daniels',
  size = '100/150'
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  return (
    <div className="w-[300px] mt-16 mx-2.5 group">
      <div className="relative pt-[300px] shadow-lg transition-all duration-300 hover:-translate-y-2.5 overflow-hidden">
        {/* Purple background with gradient */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: '#2D1A4A',
            border: '1px solid rgba(250,250,250,0.1)',
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
            }}
          />
        </div>

        {/* Background Logo with hover animation */}
        <div 
          className="absolute -top-1/3 left-1/2 w-[125%] h-[125%] bg-center bg-no-repeat bg-contain opacity-50 z-[5] -translate-x-1/2 transition-all duration-500 delay-100 transform group-hover:-translate-y-4"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />

        {/* Product image */}
        <div 
          className="absolute bottom-[calc(100%-300px)] w-full h-[250px] bg-center bg-no-repeat bg-contain transition-all duration-300 group-hover:h-[275px] z-10"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Enhanced Favorite button with animations */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-5 right-5 z-10 w-8 h-8 group/heart"
        >
          <svg width="0" height="0">
            <defs>
              <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047A6E" />
                <stop offset="50%" stopColor="#047A6E" />
                <stop offset="100%" stopColor="#9F1E07" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Background heart for the fill animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className={`transition-all duration-500 ${
                isFavorite 
                  ? 'scale-100 opacity-100' 
                  : 'scale-90 opacity-0'
              }`}
              style={{ 
                stroke: 'url(#heart-gradient)',
                fill: 'url(#heart-gradient)',
                strokeWidth: 1.5
              }}
            />
          </div>
          
          {/* Foreground heart for the outline animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className={`transition-all duration-300 ${
                isFavorite
                  ? 'scale-110 opacity-0'
                  : 'scale-100 opacity-100 hover:scale-110'
              }`}
              style={{ 
                stroke: '#FAFAFA',
                fill: 'transparent',
                strokeWidth: 1.5
              }}
            />
          </div>
        </button>

        {/* Product info */}
        <div className="relative px-5 pt-5 pb-4 z-10">
          <div className="flex flex-col items-center">
            <h3 className="font-faculty text-base text-[#FAFAFA] text-center font-semibold mb-2.5 line-clamp-2">
              {title}
            </h3>
            
            <p className="text-sm text-[#FAFAFA] font-montserrat truncate w-full text-center mb-4">
              Sticla: <span className="text-[#047A6E]">{bottleType}</span> | Marime: <span className="bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text text-transparent">{size}</span>
            </p>

            <div className="flex items-center justify-between w-full">
              <div className="relative flex-grow">
                <p className="font-faculty text-2xl text-[#FAFAFA] text-left font-semibold">
                  {price} RON
                </p>
              </div>

              <button
                onClick={() => setIsInCart(!isInCart)}
                className="ml-4 w-10 h-10 flex items-center justify-center relative transition-all duration-300"
              >
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id="cart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#047A6E" />
                      <stop offset="100%" stopColor="#9F1E07" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="relative w-6 h-6">
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isInCart ? 'scale-0 rotate-12 opacity-0' : 'scale-100 rotate-0 opacity-100'
                  }`}>
                    <ShoppingCart className="w-full h-full text-[#FAFAFA]" strokeWidth={1.5} />
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isInCart ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-12 opacity-0'
                  }`}>
                    <Check style={{ stroke: 'url(#cart-gradient)', strokeWidth: 1.5 }} className="w-full h-full" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;