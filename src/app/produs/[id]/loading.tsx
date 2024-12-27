import Header from "@/components/header/header";
import PageLayout from "@/components/layout/page-layout";
import Footer from "@/components/footer/footer";

export default function Loading() {
  return (
    <PageLayout>
      <Header />
      <main className="relative min-h-screen w-full px-8 py-16">
        <div className="w-full h-8 mb-8 bg-[#2D1A4A] rounded animate-pulse" />
        
        <div className="flex flex-row gap-16">
          <div className="w-1/2">
            <div 
              className="aspect-square rounded-lg animate-pulse"
              style={{
                background: '#2D1A4A',
                border: '1px solid rgba(250,250,250,0.1)',
              }}
            />
          </div>
          
          <div className="w-1/2 space-y-8">
            <div className="h-16 bg-[#2D1A4A] rounded animate-pulse" />
            
            <div className="space-y-4">
              <div className="h-8 w-1/3 bg-[#2D1A4A] rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-[#2D1A4A] rounded animate-pulse" />
                <div className="h-4 bg-[#2D1A4A] rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-[#2D1A4A] rounded animate-pulse" />
              </div>
            </div>
            
            <div className="h-12 w-48 bg-[#2D1A4A] rounded animate-pulse" />
          </div>
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}