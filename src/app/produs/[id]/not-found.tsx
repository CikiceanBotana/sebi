import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from "@/components/header/header";
import PageLayout from "@/components/layout/page-layout";
import Footer from "@/components/footer/footer";

export default function NotFound() {
  return (
    <PageLayout>
      <Header />
      <main className="relative min-h-screen w-full px-8 py-16 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-lacquer text-[#FAFAFA] mb-8">Produs Negăsit</h1>
        <p className="text-[#FAFAFA]/80 font-montserrat mb-8">
          Ne pare rău, dar produsul pe care îl cauți nu mai este disponibil.
        </p>
        <Link 
          href="/magazin"
          className="flex items-center gap-2 text-[#FAFAFA] hover:text-[#047A6E] transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          <span className="font-montserrat">Înapoi la Magazin</span>
        </Link>
      </main>
      <Footer />
    </PageLayout>
  );
}