'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/components/header/CartComponents';

export default function PaymentStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const status = searchParams.get('status');

  const handleClearCart = useCallback(() => {
    if (status === 'success') {
      clearCart();
    }
  }, [status, clearCart]);

  useEffect(() => {
    handleClearCart();
  }, [handleClearCart]);

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <div className="flex flex-col items-center text-center space-y-6">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
            <h1 className="text-4xl font-faculty text-[#FAFAFA]">Plata Confirmată!</h1>
            <div className="space-y-4 max-w-md">
              <p className="text-lg font-montserrat text-[#FAFAFA]/90">
                Mulțumim pentru comanda ta! Un email de confirmare cu detaliile comenzii și informații despre livrare va fi trimis în curând.
              </p>
              <p className="text-base font-montserrat text-[#FAFAFA]/80">
                Vei primi actualizări despre statusul comenzii tale pe email.
              </p>
            </div>
            <button 
              onClick={() => router.push('/magazin')}
              className="mt-8 px-8 py-3 bg-[#9F1E07] text-[#FAFAFA] rounded-lg font-faculty
                       hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-300"
            >
              Înapoi la Magazin
            </button>
          </div>
        );

      case 'failure':
        return (
          <div className="flex flex-col items-center text-center space-y-6">
            <XCircle className="w-20 h-20 text-red-500" />
            <h1 className="text-4xl font-faculty text-[#FAFAFA]">Plată Eșuată</h1>
            <p className="text-lg font-montserrat text-[#FAFAFA]/90 max-w-md">
              Ne pare rău, dar a apărut o problemă cu plata ta. Te rugăm să încerci din nou sau să contactezi serviciul clienți pentru asistență.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => router.push('/checkout')}
                className="px-6 py-3 bg-[#9F1E07] text-[#FAFAFA] rounded-lg font-faculty
                         hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-300"
              >
                Încearcă din nou
              </button>
              <button 
                onClick={() => router.push('/contact')}
                className="px-6 py-3 bg-transparent border border-[#FAFAFA] text-[#FAFAFA] rounded-lg font-faculty
                         hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-300"
              >
                Contact Suport
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center text-center space-y-6">
            <Loader2 className="w-16 h-16 text-[#FAFAFA] animate-spin" />
            <p className="text-lg font-montserrat text-[#FAFAFA]/90">
              Se procesează plata...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl p-8 rounded-lg"
        style={{
          background: '#2D1A4A',
          border: '1px solid rgba(250,250,250,0.1)',
        }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{
            background: 'radial-gradient(circle at top left, #4A2B7A 0%, #4A2B7A 10%, rgba(74,43,122,0.8) 20%, rgba(74,43,122,0.5) 35%, rgba(74,43,122,0.2) 45%, transparent 60%)'
          }}
        />
        <div className="relative z-10">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}