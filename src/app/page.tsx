import { SiteHeader } from '@/components/landing/site-header';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Stages } from '@/components/landing/stages';
import { Workflow } from '@/components/landing/workflow';
import { Faq } from '@/components/landing/faq';
import { ClosingCta, SiteFooter } from '@/components/landing/closing';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-paper">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48rem]" aria-hidden="true">
        <div className="absolute inset-0 bg-blueprint bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brass/15 blur-[120px]" />
      </div>

      <SiteHeader />
      <main className="relative">
        <Hero />
        <Features />
        <Stages />
        <Workflow />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
