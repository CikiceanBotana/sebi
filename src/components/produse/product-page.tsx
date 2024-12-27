'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/components/header/CartComponents';
import { getAssetURL } from '../../../utils/api';

interface ProductPageProps {
  product: {
    id: number;
    Titlu: string;
    Descriere: string;
    Pret: number;
    TipSticla: string;
    Dimensiune: string;
    Imagine: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.Titlu,
      price: product.Pret,
      imageUrl: getAssetURL(product.Imagine),
      bottleType: product.TipSticla,
      size: product.Dimensiune
    });
  };

  return (
    <div className="min-h-screen w-full px-8 py-16">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-300 mb-8"
      >
        <ArrowLeft size={20} />
        <span className="font-montserrat">Înapoi</span>
      </button>

      <div className="flex flex-row gap-16">
        {/* Left Column - Image */}
        <div className="w-1/2">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0"
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
            <img
              src={getAssetURL(product.Imagine)}
              alt={product.Titlu}
              className="relative z-10 w-full h-full object-contain p-8"
            />
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="w-1/2 space-y-8">
          <h1 className="text-6xl font-lacquer text-[#FAFAFA]">{product.Titlu}</h1>
          
          <div className="space-y-4">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-faculty text-[#FAFAFA]">
                {product.Pret} RON
              </span>
              <span className="text-[#FAFAFA]/60 font-montserrat">
                {product.TipSticla} | {product.Dimensiune}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-faculty text-[#FAFAFA] mb-3">Descriere Produs</h2>
                <p className="text-[#FAFAFA]/80 font-montserrat leading-relaxed">
                  {product.Descriere}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-faculty text-[#FAFAFA] mb-3">Detalii Tehnice</h2>
                <div className="space-y-2 text-[#FAFAFA]/80 font-montserrat">
                  <p>• Creat cu o sticlă autentică {product.TipSticla}</p>
                  <p>• Dimensiune: {product.Dimensiune}</p>
                  <p>• Ramă personalizată, confecționată manual</p>
                  <p>• Iluminare LED încorporată</p>
                  <p>• Sistem de prindere robust, pregătit pentru montare</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-faculty text-[#FAFAFA] mb-3">Informații Importante</h2>
                <div className="space-y-2 text-[#FAFAFA]/80 font-montserrat">
                  <p>• Fiecare piesă este unică, creată manual cu atenție la detalii</p>
                  <p>• Include certificat de autenticitate</p>
                  <p>• Livrare specială, ambalat cu grijă pentru siguranță maximă</p>
                  <p>• Garanție pentru sistemul de iluminare: 2 ani</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex items-center gap-3 bg-[#9F1E07] text-[#FAFAFA] px-8 py-4 rounded-lg 
                     font-faculty hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-all duration-300"
          >
            <ShoppingCart 
              className={`w-5 h-5 transition-all duration-300 ${
                isHovered ? 'stroke-[url(#cart-gradient)]' : 'stroke-[#FAFAFA]'
              }`}
            />
            Adaugă în Coș
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="cart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#047A6E" />
                  <stop offset="50%" stopColor="#047A6E" />
                  <stop offset="100%" stopColor="#9F1E07" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;