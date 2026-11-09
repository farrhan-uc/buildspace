const stages = [
  'Site prep',
  'Footing',
  'Plinth',
  'Structure',
  'Slab',
  'Masonry',
  'Plaster',
  'Tiling',
  'Doors & windows',
  'Plumbing',
  'Electrical',
  'Painting',
  'Finishing',
];

const stats = [
  { label: 'House estimate', value: '₹14.8L' },
  { label: 'Cost / sq ft', value: '₹1,862' },
  { label: 'Vendor matches', value: '24' },
  { label: 'Stages covered', value: '13' },
];

const highlights = [
  { title: 'Transparent line items', description: 'Every quantity, rate and calculation stays visible so you can explain each cost without surprises.' },
  { title: 'Local market pricing', description: 'Kota and Rajasthan defaults are tuned to the real market, with editable overrides for your project.' },
  { title: 'Supplier discovery', description: 'Shortlist nearby cement, steel, tile and sanitary suppliers from the same workflow.' },
];

const steps = [
  { title: 'Describe the build', text: 'Add plot size, floor count, quality, and your preferred labour model.' },
  { title: 'Adjust pricing', text: 'Override materials and review stage-wise cost before you lock in a budget.' },
  { title: 'Share and compare', text: 'Export a clean estimate and match nearby suppliers for the right materials.' },
];

const faqs = [
  { q: 'Is BuildSpace free?', a: 'Yes — the launch plan is free for every registered user.' },
  { q: 'Does it work for Kota and Rajasthan?', a: 'Yes. The default material and labour assumptions are tuned to the local market.' },
  { q: 'Can I override rates?', a: 'Absolutely. Every material rate can be edited per project and tracked with source metadata.' },
  { q: 'What happens if I do not have live supplier credentials?', a: 'The app falls back to mock-safe local supplier data, so demo and prototype flows continue without breaking.' },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4efe8] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(202,142,82,0.24),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(35,82,126,0.14),transparent_62%)] blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f7d7a8,#c9864a)] text-base font-black text-slate-950 shadow-[0_8px_18px_rgba(201,134,74,0.38)]">B</div>
          <div>
            <div className="text-base font-black uppercase tracking-[0.18em] text-slate-900">BuildSpace</div>
            <div className="text-[9px] uppercase tracking-[0.28em] text-slate-500">Cost clarity</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#features" className="transition hover:text-slate-900">Features</a>
          <a href="#workflow" className="transition hover:text-slate-900">Workflow</a>
          <a href="#faq" className="transition hover:text-slate-900">FAQ</a>
        </nav>

        <a href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,23,42,0.15)] transition hover:translate-y-[-1px]">Get started</a>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-4 pb-8 pt-4 sm:px-6">
        <div className="mx-auto max-w-md rounded-[2.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f7f2ed)] p-3 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
          <div className="rounded-[2rem] border border-slate-200 bg-[#f6f1ea] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">Live</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">BuildSpace</div>
                <div className="mt-1 text-2xl font-black text-slate-900">₹14.8L</div>
              </div>

              <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#1b2635,#0f172a)] p-4 text-white shadow-[0_18px_32px_rgba(15,23,42,0.25)]">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-slate-300">
                  <span>Project</span>
                  <span>G+0</span>
                </div>
                <div className="mt-3 text-3xl font-black">₹14,82,450</div>
                <div className="mt-1 text-xs text-slate-300">1,200 sq ft • Kota</div>
              </div>

              <div className="rounded-[1.4rem] border border-slate-200 bg-white p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span className="font-bold text-slate-900">64%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200">
                  <div className="h-full w-[64%] rounded-full bg-[linear-gradient(90deg,#f4d7ad,#d58a3d)]" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                  <div className="rounded-xl bg-[#f7efe7] px-2 py-1.5 text-slate-700">Excavation • done</div>
                  <div className="rounded-xl bg-[#f7efe7] px-2 py-1.5 text-slate-700">Footing • done</div>
                  <div className="rounded-xl bg-[#f7efe7] px-2 py-1.5 text-slate-700">Columns • done</div>
                  <div className="rounded-xl bg-[#f4f1ee] px-2 py-1.5 text-slate-500">Paint • pending</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-2.5">
                    <div className="text-sm font-black text-slate-900">{stat.value}</div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-xl text-center">
          <div className="inline-flex rounded-full border border-[#ddac6f]/30 bg-[#f8ebd6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d5c2c]">Free for every builder</div>
          <h1 className="mt-4 text-4xl font-black leading-[1.04] text-slate-900 sm:text-5xl">Build with certainty,<br />not guesswork.</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">A premium home-cost estimator for Indian builders, homeowners, and contractors — from excavation to finish, with suppliers and pricing built in.</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/login" className="rounded-full bg-[linear-gradient(135deg,#f8d8a8,#d78b3a)] px-6 py-3 text-sm font-black text-slate-950 shadow-[0_12px_26px_rgba(215,139,58,0.26)]">Create free estimate</a>
            <a href="#features" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800">See how it works</a>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#9d6434]">Why builders choose it</div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Premium clarity, app-like ease.</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item, idx) => (
            <div key={item.title} className="rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.04)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7efe7] text-lg text-[#9d6434]">{idx === 0 ? '✓' : idx === 1 ? '◎' : '↗'}</div>
              <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#9d6434]">How it works</div>
          <h3 className="mt-2 text-2xl font-black text-slate-900">Three quick steps.</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[1.7rem] border border-slate-200 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.04)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7efe7] text-sm font-black text-[#9d6434]">0{index + 1}</div>
              <h4 className="text-lg font-black text-slate-900">{step.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="relative z-10 mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6">
        <div className="mb-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#9d6434]">FAQ</div>
          <h3 className="mt-2 text-2xl font-black text-slate-900">Everything you need to know.</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
              <div className="text-base font-black text-slate-900">{faq.q}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
