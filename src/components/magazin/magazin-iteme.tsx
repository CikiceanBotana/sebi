import React, { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/components/header/CartComponents';
import { useRouter } from 'next/navigation';

interface StoreItemProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  bottleType: string;
  size: string;
  backgroundImageUrl?: string;
}

const StoreItem: React.FC<StoreItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  bottleType,
  size,
  backgroundImageUrl = '/produse/Logo.webp'
}) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const { items, addItem, removeItem } = useCart();
  const isInCart = items.some(item => item.id === id);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking cart button
    if (isInCart) {
      removeItem(id);
    } else {
      addItem({
        id,
        title,
        price,
        imageUrl,
        bottleType,
        size
      });
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite button
    setIsFavorite(!isFavorite);
  };

  const handleProductClick = () => {
    router.push(`/produs/${id}`);
  };

  // Create unique IDs for the gradients
  const heartGradientId = `heart-gradient-${title.replace(/\s+/g, '-')}`;
  const cartGradientId = `cart-gradient-${title.replace(/\s+/g, '-')}`;

  return (
    <div className="w-full max-w-[300px] sm:w-[300px] mt-8 sm:mt-16 mx-auto sm:mx-2.5 group">
      <div 
        onClick={handleProductClick}
        className="relative pt-[250px] sm:pt-[300px] shadow-lg transition-all duration-300 hover:-translate-y-2.5 overflow-hidden cursor-pointer"
      >
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

        {/* Background Logo */}
        <div 
          className="absolute -top-1/3 left-1/2 w-[125%] h-[125%] opacity-50 z-[5] -translate-x-1/2 transition-all duration-500 delay-100 transform group-hover:-translate-y-4"
        >
          <img 
            src={backgroundImageUrl}
            alt="Background Logo"
            className="w-full h-full object-contain"
            style={{ mixBlendMode: 'soft-light' }}
            loading="lazy"
          />
        </div>

        {/* Product image */}
        <div className="absolute bottom-[calc(100%-250px)] sm:bottom-[calc(100%-300px)] w-full h-[200px] sm:h-[250px] transition-all duration-300 group-hover:h-[225px] sm:group-hover:h-[275px] z-10">
          <img 
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-5 right-5 z-10 w-8 h-8 group/heart"
        >
          <svg width="0" height="0">
            <defs>
              <linearGradient id={heartGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047A6E" />
                <stop offset="50%" stopColor="#047A6E" />
                <stop offset="100%" stopColor="#9F1E07" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className={`transition-all duration-500 ${
                isFavorite ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
              style={{ 
                stroke: `url(#${heartGradientId})`,
                fill: `url(#${heartGradientId})`,
                strokeWidth: 1.5
              }}
            />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className={`transition-all duration-300 ${
                isFavorite ? 'scale-110 opacity-0' : 'scale-100 opacity-100 hover:scale-110'
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
        <div className="relative px-4 sm:px-5 pt-4 sm:pt-5 pb-4 z-10">
          <div className="flex flex-col items-center">
            <h3 className="font-faculty text-sm sm:text-base text-[#FAFAFA] text-center font-semibold mb-2.5 line-clamp-2">
              {title}
            </h3>
            
            <div className="w-full px-2 mb-4">
              <p className="text-xs sm:text-sm text-[#FAFAFA] font-montserrat text-center flex items-center justify-center flex-wrap gap-2 min-h-[24px]">
                <span className="whitespace-nowrap">Sticla: 
                  <span className="text-[#047A6E] ml-1">{bottleType}</span>
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="whitespace-nowrap sm:inline block">Marime: 
                  <span className="bg-gradient-to-r from-[#047A6E] via-[#047A6E] to-[#9F1E07] bg-clip-text text-transparent ml-1">{size}</span>
                </span>
              </p>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="relative flex-grow">
                <p className="font-faculty text-xl sm:text-2xl text-[#FAFAFA] text-left font-semibold">
                  {price} RON
                </p>
              </div>

              <button
                onClick={handleCartClick}
                className="ml-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative transition-all duration-300"
              >
                <svg width="0" height="0">
                  <defs>
                    <linearGradient id={cartGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#047A6E" />
                      <stop offset="100%" stopColor="#9F1E07" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isInCart ? 'scale-0 rotate-12 opacity-0' : 'scale-100 rotate-0 opacity-100'
                  }`}>
                    <ShoppingCart className="w-full h-full text-[#FAFAFA]" strokeWidth={1.5} />
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isInCart ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-12 opacity-0'
                  }`}>
                    <Check 
                      style={{ stroke: `url(#${cartGradientId})`, strokeWidth: 1.5 }} 
                      className="w-full h-full" 
                    />
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