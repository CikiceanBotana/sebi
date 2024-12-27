"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Video } from 'lucide-react';
import { useCart } from '@/components/header/CartComponents';
import { getAssetURL } from 'utils/api';
import QRModal from './QRModal';

interface ProductPageClientProps {
  product: {
    id: number;
    Titlu: string;
    Descriere: string;
    Pret: number;
    TipSticla: string;
    Dimensiune: string;
    Imagine: string;
    greutate?: number | null;
    specificatii_led?: string | null;
    consum_putere?: string | null;
    durata_de_viata_led?: string | null;
    tip_rama?: string | null;
  };
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isManufacturingHovered, setIsManufacturingHovered] = useState(false);

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

  // Helper function to check if technical specs exist
  const hasTechnicalSpecs = product.greutate || product.specificatii_led || 
                           product.consum_putere || product.durata_de_viata_led;

  return (
    <>
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
            <h1 className="text-6xl font-lacquer bg-gradient-to-r from-[#047A6E] via-[#FAFAFA] to-[#9F1E07] bg-clip-text text-transparent">
              {product.Titlu}
            </h1>
            
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
                  <h2 className="text-xl font-faculty bg-gradient-to-r from-[#047A6E] via-[#FAFAFA] to-[#9F1E07] bg-clip-text text-transparent mb-3">
                    Descriere Produs
                  </h2>
                  <p className="text-[#FAFAFA]/80 font-montserrat leading-relaxed">
                    {product.Descriere}
                  </p>
                </div>

                <div className="border-t border-[#FAFAFA]/10 pt-4">
                  <h2 className="text-xl font-faculty bg-gradient-to-r from-[#047A6E] via-[#FAFAFA] to-[#9F1E07] bg-clip-text text-transparent mb-2">
                    Despre Produs
                  </h2>
                  <p className="text-[#FAFAFA]/80 font-montserrat leading-relaxed mb-4">
                    O piesă de artă unică, creată manual folosind o sticlă autentică {product.TipSticla}. 
                    Cu dimensiunea de {product.Dimensiune}, această creație impunătoare îmbină eleganța 
                    designului contemporan cu iluminarea LED integrată profesional, totul încadrat într-o 
                    ramă premium confecționată manual.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#FAFAFA]/70 font-montserrat">
                    <div>
                      <h3 className="font-faculty bg-gradient-to-r from-[#047A6E] via-[#FAFAFA] to-[#9F1E07] bg-clip-text text-transparent mb-2">
                        Specificații
                      </h3>
                      <ul className="space-y-1">
                        <li>• Dimensiune: {product.Dimensiune}</li>
                        <li>• Material: Sticlă {product.TipSticla}</li>
                        {product.tip_rama && (
                          <li>• Ramă: {product.tip_rama}</li>
                        )}
                        {product.greutate && (
                          <li>• Greutate: {product.greutate} kg</li>
                        )}
                      </ul>
                    </div>
                    {hasTechnicalSpecs && (
                      <div>
                        <h3 className="font-faculty bg-gradient-to-r from-[#047A6E] via-[#FAFAFA] to-[#9F1E07] bg-clip-text text-transparent mb-2">
                          Tehnic
                        </h3>
                        <ul className="space-y-1">
                          {product.specificatii_led && (
                            <li>• LED: {product.specificatii_led}</li>
                          )}
                          {product.consum_putere && (
                            <li>• Consum: {product.consum_putere}</li>
                          )}
                          {product.durata_de_viata_led && (
                            <li>• Durată LED: {product.durata_de_viata_led}</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons section */}
            <div className="flex gap-4">
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
              </button>

              <button
                onClick={() => setIsQRModalOpen(true)}
                onMouseEnter={() => setIsManufacturingHovered(true)}
                onMouseLeave={() => setIsManufacturingHovered(false)}
                className="group flex items-center gap-3 bg-transparent text-[#FAFAFA] px-8 py-4 rounded-lg 
                         font-faculty border border-[#FAFAFA] hover:bg-[#FAFAFA] hover:text-[#9F1E07] 
                         hover:border-[#9F1E07] transition-all duration-300"
              >
                <Video 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isManufacturingHovered ? 'stroke-[url(#manufacturing-gradient)]' : 'stroke-[#FAFAFA]'
                  }`}
                />
                Vezi procesul de fabricație
              </button>
            </div>

            {/* SVG Gradients */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="cart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#047A6E" />
                  <stop offset="50%" stopColor="#047A6E" />
                  <stop offset="100%" stopColor="#9F1E07" />
                </linearGradient>
                <linearGradient id="manufacturing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#047A6E" />
                  <stop offset="50%" stopColor="#047A6E" />
                  <stop offset="100%" stopColor="#9F1E07" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <QRModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </>
  );
}