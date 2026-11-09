# BuildSpace engine notes

## Reference case

The engine includes a documented reference house for validation and regression work.

- Project: 1,000 sq ft G+0 house
- City: Kota, Rajasthan
- Building type: residential house
- Structure: RCC framed
- Quality tier: Standard
- Labour model: Material + Labour (turnkey)
- Plot area: 1,200 sq ft
- Floors: 1
- Built-up area: 1,000 sq ft
- Defaults: GST 5%, contractor profit 10%, contingency 5%

Expected range for the total estimate: ₹12.5L to ₹18.0L.

This range intentionally allows for regional market variation, local final rates and quality differences. The engine outputs a project total that is meant to be reviewed, edited and overridden by the user before a final quote is shared.

## Formula conventions

- Concrete and masonry quantities are based on a dry volume factor and simplified rate multipliers, with explicit values exposed in the calculation strings for each line item.
- Hermetic validation is implemented by checking that every stage subtotal, stage percentage and BOM entry stays in a plausible range for the project size.
- Every line item stores the exact formula string that produced the total so the UI can render a "Show calculation" drawer without a separate back-end requirement.
- Rates are read from a data source and can be overridden at project level; source and last-updated metadata stay attached to each estimate line item.
