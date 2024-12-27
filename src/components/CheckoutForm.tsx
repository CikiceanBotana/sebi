import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Check if we have a payment status to handle
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          router.push('/payment-status?status=success');
          break;
        case 'processing':
          setMessage('Plata ta este în curs de procesare.');
          break;
        case 'requires_payment_method':
          setError('Plata ta nu a reușit, te rugăm să încerci din nou.');
          break;
        default:
          setError('Ceva nu a mers bine, te rugăm să încerci din nou.');
          break;
      }
    });
  }, [stripe, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-status?status=success`,
          payment_method_data: {
            billing_details: {
              // You can add additional billing details here if needed
            },
          },
        },
      });

      if (submitError) {
        if (submitError.type === 'card_error' || submitError.type === 'validation_error') {
          setError(submitError.message ?? 'A apărut o eroare la procesarea plății.');
        } else {
          setError('A apărut o eroare neașteptată.');
        }
        router.push('/payment-status?status=failure');
      }
    } catch (e: any) {
      console.error('Payment error:', e);
      setError('A apărut o eroare la procesarea plății.');
      router.push('/payment-status?status=failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-faculty text-[#FAFAFA] mb-2">Detalii Plată</h3>
        <p className="text-sm font-montserrat text-[#FAFAFA]/80">
          Plata este procesată securizat prin Stripe
        </p>
      </div>

      <div className="space-y-4">
        <PaymentElement 
          options={{
            layout: 'tabs',
            terms: {
              card: 'never'
            },
          }}
        />

        {message && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm font-montserrat">{message}</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm font-montserrat">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[#9F1E07] text-[#FAFAFA] p-4 rounded-lg font-faculty
                   hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Se procesează...
            </>
          ) : (
            'Finalizează Plata'
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm font-montserrat text-[#FAFAFA]/60">
          Prin finalizarea comenzii, ești de acord cu 
          <button 
            type="button"
            onClick={() => router.push('/terms')}
            className="text-[#047A6E] hover:text-[#9F1E07] transition-colors duration-200 ml-1"
          >
            termenii și condițiile noastre
          </button>
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;