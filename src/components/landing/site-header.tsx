import Link from 'next/link';
import { Logo } from './logo';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#stages', label: 'Stages' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#faq', label: 'FAQ' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="BuildSpace home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-paper">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-paper sm:inline-flex">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-brass px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brass-light"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
