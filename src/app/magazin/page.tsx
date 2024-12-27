import Header from "@/components/header/header";
import PageLayout from "@/components/layout/page-layout";
import StoreSection from "@/components/magazin/magazin-section";
import Footer from "@/components/footer/footer";

export default function MagazinPage() {
  return (
    <PageLayout>
      <Header />
      <main className="relative">
        <StoreSection />
      </main>
      <Footer />
    </PageLayout>
  );
}