// page.tsx
import Header from "@/components/header/header";
import PageLayout from "@/components/layout/page-layout";
import Footer from "@/components/footer/footer";
import { redirect } from 'next/navigation';
import { ProductPageClient } from "./ProductPageClient";

// Define a proper type for page props
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/store_items/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    redirect('/404');
  }

  if (product.purchase_status === 'sold') {
    redirect('/magazin');
  }

  const formattedProduct = {
    id: product.id,
    Titlu: product.Titlu,
    Descriere: product.Descriere,
    Pret: product.Pret,
    TipSticla: product.sticla,
    Dimensiune: product.Marime,
    Imagine: product.Imagine_produs,
    greutate: product.greutate,
    specificatii_led: product.specificatii_led,
    consum_putere: product.consum_putere,
    durata_de_viata_led: product.durata_de_viata_led,
    tip_rama: product.tip_rama
  };

  return (
    <PageLayout>
      <Header />
      <main className="relative">
        <ProductPageClient product={formattedProduct} />
      </main>
      <Footer />
    </PageLayout>
  );
}