// frontend/src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  bottleType?: string;
  size?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, metadata } = body as { 
      items: CartItem[];
      metadata?: Record<string, any>;
    };

    if (!items?.length) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    const amount = items.reduce((sum: number, item: CartItem) => sum + item.price, 0);
    
    // Format items for Stripe metadata
    const itemsMetadata = items.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      bottleType: item.bottleType,
      size: item.size
    }));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'ron',
      metadata: {
        ...metadata,
        items: JSON.stringify(itemsMetadata)
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Created payment intent:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      metadata: paymentIntent.metadata
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}