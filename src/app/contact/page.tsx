// src/app/contact/page.tsx
import Header from "@/components/header/header";
import PageLayout from "@/components/layout/page-layout";
import Footer from "@/components/footer/footer";
import ContactForm from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <PageLayout>
      <Header />
      <main className="relative">
        <div className="relative min-h-screen">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </PageLayout>
  );
}