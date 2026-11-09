# BuildSpace QA checklist

## Functional checks

- Landing page renders without errors.
- Public auth routes render correctly: `/login`, `/signup`, `/forgot-password`.
- Protected routes redirect unauthenticated users to `/login`.
- `/dashboard` shows the user welcome state and project cards.
- `/projects/new` updates project totals and stage values as inputs change.
- Material rate overrides change the estimate live.
- BOM values update consistently with the estimate.
- `/suppliers` shows nearby supplier cards and category filters.
- `/visualizer` loads the 3D house preview without crashing.
- `/reports` shows top stages and supports CSV export.
- `/settings` includes accessibility-ready labels and language switch controls.

## Data and calculation checks

- Engine tests pass for the 1,000 sq ft reference case.
- Stage totals remain positive and within expected ranges.
- BOM totals remain realistic for a standard 1,000 sq ft home.
- GST, contractor profit, and contingency values are applied consistently.

## Browser checks

- App loads in desktop Chrome and Edge.
- Navigation works across protected app pages.
- Buttons and form fields remain readable at normal zoom levels.
- Skip-to-content access works for keyboard users.

## Release readiness

- Mock-safe fallback is clearly documented.
- Production env variables are defined before enabling live integrations.
- No fatal hydration or build errors remain.
- Team can demo the full flow without credentials.
