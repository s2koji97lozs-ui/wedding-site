import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Movie } from '@/components/sections/Movie';
import { BestShots } from '@/components/sections/BestShots';
import { GuestHighlights } from '@/components/sections/GuestHighlights';
import { Links } from '@/components/sections/Links';
import { Footer } from '@/components/sections/Footer';
import PinGate from '@/components/functional/PinGate'; // ※別途実装

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* PINゲートで全体をラップ（不要なら外す） */}
      <PinGate>
        <Hero />
        <Intro />
        <Movie />
        <BestShots />
        <GuestHighlights />
        <Links />
        <Footer />
      </PinGate>
    </main>
  );
}