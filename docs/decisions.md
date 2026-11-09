# Decision log

## 2026-11-09

- Default regional focus is Kota / Rajasthan for seed rates and stage defaults because the product brief prioritises this geography.
- All rate values in the app are treated as editable dataset entries, not hard-coded assumptions, so defaults are research-backed but can be overridden at project level.
- The default labour model is Material + Labour (turnkey), with owner-supplied material treated as a selectable alternative.
- A 5% contingency is retained as the default global modifier because it aligns with standard estimating practices and the brief's default requirement.
- Until live Google Maps and Supabase credentials exist, the application will ship in mock-data-friendly mode and clearly document where real keys connect in `.env.example`.
