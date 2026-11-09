import { BadgeCheck, MapPin, Store, type LucideIcon } from 'lucide-react';

export const stages = [
  { name: 'Site prep', share: 3 },
  { name: 'Footing', share: 9 },
  { name: 'Plinth', share: 6 },
  { name: 'Structure', share: 18 },
  { name: 'Slab', share: 12 },
  { name: 'Masonry', share: 10 },
  { name: 'Plaster', share: 6 },
  { name: 'Tiling', share: 8 },
  { name: 'Doors & windows', share: 7 },
  { name: 'Plumbing', share: 5 },
  { name: 'Electrical', share: 5 },
  { name: 'Painting', share: 4 },
  { name: 'Finishing', share: 7 },
];

export const stats = [
  { label: 'Construction stages', value: '13' },
  { label: 'Material line items', value: '120+' },
  { label: 'Local suppliers', value: '24' },
  { label: 'Cost to start', value: '₹0' },
];

export const highlights: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Transparent line items',
    description: 'Every quantity, rate and formula stays visible, so you can explain each rupee to the owner without surprises.',
    icon: BadgeCheck,
  },
  {
    title: 'Local market pricing',
    description: 'Kota and Rajasthan defaults are tuned to real market rates, with per-project overrides and source tracking.',
    icon: MapPin,
  },
  {
    title: 'Supplier discovery',
    description: 'Shortlist nearby cement, steel, tile and sanitary suppliers without leaving your estimate.',
    icon: Store,
  },
];

export const steps = [
  { title: 'Describe the build', text: 'Plot size, floors, quality grade and labour model — that is all it takes to start.' },
  { title: 'Tune the rates', text: 'Override any material or labour rate and watch each stage recalculate instantly.' },
  { title: 'Share & source', text: 'Export a clean, owner-ready report and match materials with nearby suppliers.' },
];

export const faqs = [
  { q: 'Is BuildSpace free?', a: 'Yes — the launch plan is free for every registered user.' },
  { q: 'Does it work for Kota and Rajasthan?', a: 'Yes. The default material and labour assumptions are tuned to the local market.' },
  { q: 'Can I override rates?', a: 'Absolutely. Every material rate can be edited per project and tracked with source metadata.' },
  {
    q: 'What if live supplier data is unavailable?',
    a: 'The app falls back to safe local supplier data, so demo and prototype flows keep working without interruption.',
  },
];
