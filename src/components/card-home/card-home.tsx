"use client";

import React, { useState, useEffect } from 'react';
import { getAssetURL } from 'utils/api';

type ColorAnalysisResult = {
  needsWhiteGradient: boolean;
};

interface Product {
  id: number;
  imagine_produs: string;
  imagine_logo: string;
  imagine_sticla: string;
}

interface ProductCardsSectionProps {
  products: Product[];
}

const useImageColorAnalysis = (imageUrl: string): ColorAnalysisResult => {
  const [needsWhiteGradient, setNeedsWhiteGradient] = useState<boolean>(false);

  useEffect(() => {
    const analyzeImage = async (): Promise<void> => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let darkPixelsCount = 0;
        let gradientColorPixelsCount = 0;
        let totalPixels = 0;

        // Convert gradient colors to RGB
        const gradientColors = {
          start: { r: 4, g: 122, b: 110 }, // #047A6E
          end: { r: 159, g: 30, b: 7 }     // #9F1E07
        };
        
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];
          
          // Only analyze non-transparent pixels
          if (a > 0) {
            totalPixels++;

            // Check for dark pixels (black or near-black)
            if (r < 30 && g < 30 && b < 30) {
              darkPixelsCount++;
            }

            // Check if color is close to either gradient color
            const isCloseToStartGradient = colorDistance(
              { r, g, b },
              gradientColors.start
            ) < 100;

            const isCloseToEndGradient = colorDistance(
              { r, g, b },
              gradientColors.end
            ) < 100;

            if (isCloseToStartGradient || isCloseToEndGradient) {
              gradientColorPixelsCount++;
            }
          }
        }

        // Need white gradient if more than 40% of pixels are either dark or close to gradient colors
        const significantPixelRatio = (darkPixelsCount + gradientColorPixelsCount) / totalPixels;
        setNeedsWhiteGradient(totalPixels > 0 && significantPixelRatio > 0.4);
      };

      img.src = imageUrl;
    };

    if (imageUrl) {
      analyzeImage();
    }
  }, [imageUrl]);

  return { needsWhiteGradient };
};

// Helper function to calculate color distance using RGB values
const colorDistance = (
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
): number => {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
    Math.pow(color1.g - color2.g, 2) +
    Math.pow(color1.b - color2.b, 2)
  );
};

interface ProductCardProps {
  mainImage: string;
  titleImage: string;
  bottleImage: string;
  altText: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ mainImage, titleImage, bottleImage, altText }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { needsWhiteGradient } = useImageColorAnalysis(titleImage);
  
  return (
    <div 
      className="transform-gpu relative w-full max-w-[280px] sm:max-w-[320px]" 
      style={{ perspective: '1000px' }}
    >
      <div 
        className="w-full h-[350px] sm:h-[380px] rounded-xl relative transform-gpu"
        style={{ 
          background: 'linear-gradient(to right, #047A6E, #047A6E, #9F1E07)',
          padding: '2px',
          transform: isHovered ? 'rotateX(15deg)' : 'rotateX(0deg)',
          transition: 'transform 0.3s ease-out',
          transformStyle: 'preserve-3d'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full rounded-xl relative overflow-hidden" 
          style={{
            background: '#2D1A4A'
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            style={{
              background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)',
              pointerEvents: 'none'
            }}
          />

          <div className="absolute inset-0">
            <img 
              src={mainImage}
              alt={altText}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="absolute bottom-0 left-0 w-full h-40"
            style={{
              background: needsWhiteGradient
                ? 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.5), transparent)'
                : 'linear-gradient(to top, rgba(42,35,90,0.95), rgba(23,1,44,0.6), transparent)'
            }}
          />
        </div>
      </div>

      <div 
        className="absolute left-1/2 w-48 sm:w-56 h-auto transition-all duration-300 ease-out pointer-events-none"
        style={{ 
          bottom: 0,
          transform: `translate(-50%, ${isHovered ? '-120px' : '-60px'})`,
          opacity: isHovered ? 1 : 0,
          zIndex: 30
        }}
      >
        <img 
          src={bottleImage}
          alt={`${altText} bottle`}
          className="w-full h-full object-contain"
        />
      </div>
      
      <div 
        className="absolute left-1/2 w-48 sm:w-56 h-32"
        style={{ 
          bottom: '-16px',
          transform: `translate(-50%, ${isHovered ? '-16px' : '0px'})`,
          transition: 'transform 0.3s ease-out',
          zIndex: 20
        }}
      >
        <img 
          src={titleImage}
          alt={`${altText} title`}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

const ProductCardsSection: React.FC<ProductCardsSectionProps> = ({ products }) => {
  return (
    <div className="w-full py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-[#FAFAFA] font-lacquer text-3xl md:text-5xl text-center mb-8 md:mb-16 relative"
          style={{
            textShadow: '0 0 20px rgba(250, 250, 250, 0.3)'
          }}
        >
          Cele Mai Vândute Produse
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8 items-center sm:items-stretch">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              mainImage={getAssetURL(product.imagine_produs)}
              titleImage={getAssetURL(product.imagine_logo)}
              bottleImage={getAssetURL(product.imagine_sticla)}
              altText={`Product ${product.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCardsSection;