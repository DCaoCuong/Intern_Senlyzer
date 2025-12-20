import { Header, Hero, TrustedBy, HowItWorks, Pricing, CTASection, Footer } from "./components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <HowItWorks />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
