# BuildSpace

A premium construction-cost estimation experience for Indian homeowners, contractors and engineers.

This project includes a working Next.js + TypeScript + Tailwind scaffold for the BuildSpace product plan, with an estimation engine, project wizard, supplier discovery, visualizer, and report export flow.

## Included

- Premium marketing landing shell
- Protected app shell with mock-safe auth fallback
- Project wizard with live estimator and editable rate overrides
- Supplier discovery module with Kota fallback data and WhatsApp/contact actions
- 3D house visualizer using React Three Fiber
- CSV export flow for project summaries
- Research, design and engine docs under `/docs`

## Quick start

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
npm run build
```

## Product notes

- The app remains free at launch and contains extension points for premium features.
- Live Supabase or Google Maps credentials are optional; the app gracefully falls back to mock-safe data until configured.
- The current build is a product-ready scaffold for handoff and iteration rather than a final production deployment.
