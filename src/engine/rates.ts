export type RateRecord = {
  materialKey: string;
  region: string;
  unit: string;
  price: number;
  sourceUrl: string;
  updatedAt: string;
  needsVerification: boolean;
};

export const defaultRates: RateRecord[] = [
  { materialKey: 'cement_opc', region: 'Kota', unit: 'bag', price: 410, sourceUrl: 'https://www.ultratechcement.com/', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'steel_tmt', region: 'Kota', unit: 'kg', price: 98, sourceUrl: 'https://www.tatatiscon.com/', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'sand_river', region: 'Kota', unit: 'cft', price: 58, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'aggregate_20mm', region: 'Kota', unit: 'cft', price: 72, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'aggregate_10mm', region: 'Kota', unit: 'cft', price: 78, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'brick_red', region: 'Kota', unit: 'nos', price: 10, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'block_aac', region: 'Kota', unit: 'nos', price: 75, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'tile_ceramic', region: 'Kota', unit: 'sqft', price: 80, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'paint_interior', region: 'Kota', unit: 'litre', price: 250, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'paint_exterior', region: 'Kota', unit: 'litre', price: 310, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'cpvc_pipe', region: 'Kota', unit: 'm', price: 110, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'wiring_copper', region: 'Kota', unit: 'm', price: 52, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'conduit_pvc', region: 'Kota', unit: 'm', price: 40, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'sanitary_fixture_set', region: 'Kota', unit: 'set', price: 6000, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'mason_labour', region: 'Kota', unit: 'day', price: 950, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'helper_labour', region: 'Kota', unit: 'day', price: 650, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'carpenter_labour', region: 'Kota', unit: 'day', price: 1100, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
  { materialKey: 'electrician_labour', region: 'Kota', unit: 'day', price: 1100, sourceUrl: 'https://www.google.com/maps', updatedAt: '2026-11-09', needsVerification: true },
];

export const getRate = (materialKey: string, region = 'Kota', rates: RateRecord[] = defaultRates): RateRecord => {
  const record = rates.find((rate) => rate.materialKey === materialKey && rate.region === region);
  if (!record) {
    throw new Error(`Missing rate for ${materialKey} in region ${region}`);
  }
  return record;
};

export const getRateMap = (rates: RateRecord[] = defaultRates): Record<string, RateRecord> =>
  Object.fromEntries(rates.map((rate) => [rate.materialKey, rate]));
