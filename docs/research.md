# BuildSpace research notes

## 1) Competitor and industry UX findings

### Summary of observed patterns
- Most construction calculators are optimized for one conversion question, not a full-project lifecycle: users can estimate a rough cost, but the workflow stops before stage-by-stage detail or BOM generation.
- The strongest tools reduce cognitive load by showing the project summary, stage list and a visible cost delta all at once.
- Users value transparent assumptions and editable rates, but many competitor tools bury them behind modal screens or hidden formulas.
- The best experiences let users switch between summary and details without losing context, which is important for phone-based site engineering.
- Supplier discovery is often disconnected from costing. The ideal product should connect a selected stage with relevant material categories and nearby vendors.
- Construction apps frequently overload users with too much engineering language; a premium app needs a cleaner interface with confidence-building explanations.

### 8-10 concrete UX takeaways
1. Show a running total early, then let users drill into stages instead of forcing them to edit a full form first.
2. Keep stage navigation visible and tactile on mobile, with a clear timeline and cost badges.
3. Make every line item transparent with a quick calculation drawer and visible source metadata.
4. Offer editable rate overrides with a clear label like “project override” rather than silent internal values.
5. Separate “what is included” from “what is assumed” to reduce trust issues in the estimate output.
6. Provide a single BOM summary for ordering materials, not just a total amount at the project level.
7. Bring supplier results close to the stage they support, using category mapping and a compact map list.
8. Pair charts with a table; users want both a quick read and an audit trail.
9. Let users compare scenarios (economy vs premium) without duplicating the entire project flow.
10. Keep the report readable and shareable; it must feel like a client-ready estimate rather than a raw spreadsheet.

### Clunky patterns to avoid
- Dense tables with no emphasis on the most important numbers
- Hidden assumptions behind copy that looks “final”
- Search/filter flows that require too many taps before a useful result appears
- Low-trust formats that do not mention rate source or revision date
- Generic vendor directories with no stage-to-category mapping

## 2) Construction stage breakdown for a typical Indian residential building

The following is the recommended stage order for BuildSpace, aligned to Indian residential residential construction workflows and the brief's 13-stage structure:

1. Site preparation and excavation
2. Footing / foundation
3. Plinth beam and plinth filling
4. Columns and structure (RCC)
5. Slab
6. Brickwork / blockwork
7. Plastering
8. Flooring and tiling
9. Doors and windows
10. Plumbing and sanitary
11. Electrical
12. Painting and finishing
13. Miscellaneous

This sequence matches what a typical RCC house in Kota / Rajasthan would experience, from excavation through finish. Where possible, inputs are grouped by work package to keep the stage totals meaningful and audit-friendly.

## 3) Indicative rates in Rajasthan / Kota (research-backed, editable)

Important: these are indicative market-research values for early prototyping. They must be treated as editable dataset inputs and should be overridden with project-specific values. Any rate that cannot be independently verified is marked with `needs_verification: true`.

| Material / service | Unit | Indicative rate | Source | Date | Notes |
|---|---:|---:|---|---|---|
| OPC cement | bag (50 kg) | ₹380–₹430 | UltraTech / local dealer market bulletin (indicative) | 2026-11-09 | needs_verification: true |
| TMT steel | ₹/kg | ₹85–₹110 | JSW steel / regional dealer pricing snapshots | 2026-11-09 | needs_verification: true |
| River sand | cft | ₹45–₹70 | Kota local sand suppliers / dealer listing surveys | 2026-11-09 | needs_verification: true |
| 20 mm aggregate | cft | ₹55–₹90 | Regional crusher aggregate pricing | 2026-11-09 | needs_verification: true |
| 10 mm aggregate | cft | ₹60–₹95 | Regional crusher aggregate pricing | 2026-11-09 | needs_verification: true |
| Red brick | nos | ₹8–₹12 | Local brick kiln / Kota market survey | 2026-11-09 | needs_verification: true |
| AAC block (600x200x200) | nos | ₹55–₹95 | AAC block dealer listings | 2026-11-09 | needs_verification: true |
| Ceramic floor tile | sq ft | ₹40–₹120 | Tile showroom pricing websites | 2026-11-09 | needs_verification: true |
| Interior wall paint (plastic emulsion) | litre | ₹180–₹320 | Local paint dealer websites | 2026-11-09 | needs_verification: true |
| Exterior paint | litre | ₹220–₹420 | Local paint dealer websites | 2026-11-09 | needs_verification: true |
| CPVC pipe | metre | ₹70–₹150 | Plumbing supplier retail pages | 2026-11-09 | needs_verification: true |
| Concealed copper wiring | metre | ₹35–₹70 | Electrical dealer market pages | 2026-11-09 | needs_verification: true |
| PVC conduit | metre | ₹25–₹60 | Electrical dealer market pages | 2026-11-09 | needs_verification: true |
| Sanitary fixture set | set | ₹2,000–₹12,000 | Brand / local showroom pricing | 2026-11-09 | needs_verification: true |
| Mason labour | day | ₹700–₹1,200 | Kota labour market estimates | 2026-11-09 | needs_verification: true |
| Helper labour | day | ₹500–₹800 | Kota labour market estimates | 2026-11-09 | needs_verification: true |
| Carpenter labour | day | ₹800–₹1,500 | Local trades market survey | 2026-11-09 | needs_verification: true |
| Electrician labour | day | ₹800–₹1,400 | Local trade rates | 2026-11-09 | needs_verification: true |

### Sources to verify before launch
- UltraTech cement dealer pricing pages and regional distributor rate cards
- JSW / Tata Tiscon TMT price lists or dealer portals
- Kota local RMC and aggregate supplier portals
- Tile and sanitary supplier catalogues for current retail pricing
- Local labour contracts / builder schedules from Rajasthan market-tracking sources

## 4) Standard quantity formulas and thumb rules

### Concrete mix ratios
- M15 = 1:2:4
- M20 = 1:1.5:3
- M25 = 1:1:2
- Dry volume multiplier for concrete: ~1.54
- Approximate steel % for RCC members:
  - Slab: 0.8%–1.2% by volume
  - Beam: 1.0%–1.5%
  - Column: 1.0%–2.0%
  - Footing: 0.5%–1.0%

### Masonry and plaster reference formulas
- Brick masonry volume conversion: approximately 500 bricks per cubic metre for standard modular bricks (actual count varies by size and mortar thickness)
- Mortar ratio examples:
  - Brickwork: 1:4 to 1:6 (cement:sand)
  - Plaster: 1:4 to 1:6 depending on finish requirement
- Internal plaster thickness: around 12–15 mm
- External plaster thickness: around 18–20 mm
- Ceiling plaster / putty: approximately 6–10 mm
- Surface deductions: openings are typically deducted from wall areas after adding a small allowance for junctions/
  waste

### Steel reference
- A practical rule-of-thumb: structural RCC steel can be referenced at ~7.85 kg per litre of concrete, but project-specific design loads and detailing dominate.
- A good planning reference: 1,000 sq ft single-floor RCC home often uses ~2,500–5,000 kg of steel depending on framing and spans.

### Wastage allowances
- Cement: 2–5%
- Steel: 3–8%
- Sand: 5–10%
- Aggregate: 5–10%
- Bricks / blocks: 3–7%
- Tiles: 5–8%
- Paint: 8–12%
- Plumbing and electrical fittings: 5–10%

### General assumptions for the engine
- Quantity calculations should always be derived from a measurable formula and supported by a visible calculation string.
- Rates must be separate from formulas; a formula must reference one or more rate entries, not a hard-coded constant.
- Every line item must have a visible `lastUpdated` label and a `rateSource` value.

## 5) Google Maps Platform capabilities relevant to BuildSpace

### Core capabilities
- Maps JavaScript API: embed an interactive map for supplier results and local markers.
- Places API (New): nearby and text search for local materials suppliers, hardware stores and trade services.
- Place Details: enrich result cards with details such as phone, website, business hours and address.
- Geolocation: permission-driven location detection to improve nearby search results on first use.

### Pricing and quota implications
- Maps usage is measured by API calls and map loads; high-density supplier search pages can consume quota quickly.
- Nearby Search and Text Search should be cached at the server level and rate-limited to avoid unnecessary repeated calls.
- Server-side proxy routes are essential to keep place keys private and to comply with usage limits.
- Results should be treated as a live service that can fail gracefully: show a manual city/PIN fallback when geolocation or Places access is unavailable.

## 6) Research quality note
This document is intentionally a research snapshot and should be treated as mutable decision support, not final truth. Final app numbers should be editable, linked to a source, and clearly labeled for verification status.
