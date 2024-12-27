'use client';
// app/ClientLayout.tsx
import { CartProvider } from '@/components/header/CartComponents';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}