'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/components/header/CartComponents';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map(item => ({
              id: item.id,
              title: item.title,
              price: item.price
            })),
            metadata: {
              orderTotal: total,
              itemCount: items.length,
            }
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        if (!data.clientSecret) {
          throw new Error('No client secret received');
        }

        console.log('Payment intent created successfully');
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        console.error('Checkout error:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [items, total]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#FAFAFA] text-center">
          <h2 className="text-2xl font-faculty mb-4">Cosul tau este gol</h2>
          <p className="font-montserrat">Adauga produse in cos pentru a continua.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div 
          className="relative p-8 rounded-lg"
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
            <h1 className="text-3xl font-faculty text-[#FAFAFA] mb-8">Finalizeaza Comanda</h1>
            
            <div className="mb-8">
              <h2 className="text-xl font-faculty text-[#FAFAFA] mb-4">Sumar Comanda</h2>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2 text-[#FAFAFA] font-montserrat">
                  <span>{item.title}</span>
                  <span>{item.price} RON</span>
                </div>
              ))}
              <div className="border-t border-[#FAFAFA]/10 mt-4 pt-4">
                <div className="flex justify-between items-center text-[#FAFAFA] font-faculty">
                  <span>Total:</span>
                  <span>{total} RON</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-500 text-center font-montserrat">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 w-full bg-[#9F1E07] text-[#FAFAFA] py-2 rounded font-faculty hover:bg-opacity-90 transition-all duration-200"
                >
                  Încearcă din nou
                </button>
              </div>
            )}

            {loading ? (
              <div className="text-center text-[#FAFAFA] font-faculty">
                <p>Se încarcă...</p>
              </div>
            ) : clientSecret ? (
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: 'night',
                    variables: {
                      colorPrimary: '#9F1E07',
                      colorBackground: '#2D1A4A',
                      colorText: '#FAFAFA',
                      colorDanger: '#df1b41',
                    }
                  }
                }}
              >
                <CheckoutForm clientSecret={clientSecret} />
              </Elements>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}