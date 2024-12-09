import Background from "../background/background";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Background />
      {children}
    </div>
  );
}