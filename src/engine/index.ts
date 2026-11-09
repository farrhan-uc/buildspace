import { defaultRates, getRate, type RateRecord } from './rates';

export type QualityTier = 'Economy' | 'Standard' | 'Premium' | 'Luxury';
export type LabourModel = 'labour_only' | 'material_labour' | 'owner_material';
export type BuildingType = 'residential_house' | 'duplex' | 'villa' | 'commercial_shop_cum_house';
export type StructureType = 'rcc' | 'load_bearing';

export type ProjectInput = {
  projectName: string;
  city: string;
  buildingType: BuildingType;
  plotAreaSqFt: number;
  builtUpAreaSqFt: number;
  floors: number;
  floorHeight: number;
  groundFloorCoverage: number;
  structureType: StructureType;
  qualityTier: QualityTier;
  labourModel: LabourModel;
  bedroomCount: number;
  bathroomCount: number;
  kitchenCount: number;
  doorCount: number;
  windowCount: number;
  region?: string;
};

export type ProjectSettings = {
  gstPercent: number;
  contractorProfitPercent: number;
  contingencyPercent: number;
  rateVolatility: 'stable' | 'moderate' | 'high';
};

export type LineItem = {
  itemId: string;
  name: string;
  unit: string;
  quantity: number;
  wastagePct: number;
  materialRate: number;
  materialCost: number;
  labourRate: number;
  labourCost: number;
  total: number;
  notes: string;
  rateSource: string;
  lastUpdated: string;
  formula: string;
};

export type StageResult = {
  stageKey: string;
  name: string;
  items: LineItem[];
  subtotal: number;
  percentOfProject: number;
  range: { min: number; expected: number; max: number };
};

export type BillOfMaterials = {
  cementBags: number;
  steelKg: number;
  sandCft: number;
  aggregateCft: number;
  bricksNos: number;
};

export type EstimateResult = {
  projectName: string;
  projectTotal: number;
  totalBeforeModifiers: number;
  perSqFt: number;
  stages: StageResult[];
  bom: BillOfMaterials;
  modifiers: ProjectSettings;
  generatedAt: string;
};

export const defaultProject: ProjectInput = {
  projectName: 'Kota Family House',
  city: 'Kota',
  buildingType: 'residential_house',
  plotAreaSqFt: 1200,
  builtUpAreaSqFt: 1000,
  floors: 1,
  floorHeight: 10,
  groundFloorCoverage: 70,
  structureType: 'rcc',
  qualityTier: 'Standard',
  labourModel: 'material_labour',
  bedroomCount: 2,
  bathroomCount: 2,
  kitchenCount: 1,
  doorCount: 6,
  windowCount: 10,
  region: 'Kota',
};

export const defaultModifiers: ProjectSettings = {
  gstPercent: 5,
  contractorProfitPercent: 10,
  contingencyPercent: 5,
  rateVolatility: 'moderate',
};

const roundCurrency = (value: number) => Math.round(value);

const createLineItem = ({
  itemId,
  name,
  unit,
  quantity,
  wastagePct,
  materialRate,
  labourRate,
  notes,
  rateSource,
  lastUpdated,
  formula,
}: {
  itemId: string;
  name: string;
  unit: string;
  quantity: number;
  wastagePct: number;
  materialRate: number;
  labourRate: number;
  notes: string;
  rateSource: string;
  lastUpdated: string;
  formula: string;
}): LineItem => {
  const materialQty = quantity * (1 + wastagePct / 100);
  const materialCost = roundCurrency(materialQty * materialRate);
  const labourCost = roundCurrency(quantity * labourRate);
  const total = materialCost + labourCost;

  return {
    itemId,
    name,
    unit,
    quantity: Number(quantity.toFixed(2)),
    wastagePct,
    materialRate: Number(materialRate.toFixed(2)),
    materialCost,
    labourRate: Number(labourRate.toFixed(2)),
    labourCost,
    total,
    notes,
    rateSource,
    lastUpdated,
    formula,
  };
};

const getProjectRates = (region: string, overrides: Record<string, number> = {}) => {
  const base = Object.fromEntries(defaultRates.map((rate) => [rate.materialKey, rate]));
  Object.entries(overrides).forEach(([materialKey, price]) => {
    if (base[materialKey]) {
      base[materialKey] = { ...base[materialKey], price, updatedAt: 'project-override', sourceUrl: 'project-override' };
    }
  });

  return Object.fromEntries(
    Object.entries(base).filter(([, rate]) => (rate as RateRecord).region === region).map(([key, rate]) => [key, rate]),
  ) as Record<string, RateRecord>;
};

const getStageRange = (subtotal: number) => {
  const min = subtotal * 0.92;
  const max = subtotal * 1.15;
  return { min: roundCurrency(min), expected: roundCurrency(subtotal), max: roundCurrency(max) };
};

const sitePreparationStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const helperRate = rateMap.helper_labour.price;
  const masonRate = rateMap.mason_labour.price;
  const items = [
    createLineItem({
      itemId: 'site-clearing',
      name: 'Clearing and marking',
      unit: 'sqft',
      quantity: area * 0.9,
      wastagePct: 0,
      materialRate: 0,
      labourRate: helperRate * 0.8,
      notes: 'Temporary clearing and layout marking before excavation.',
      rateSource: rateMap.helper_labour.sourceUrl,
      lastUpdated: rateMap.helper_labour.updatedAt,
      formula: '0.9 × builtUpArea × helper_labour_rate × 0.8',
    }),
    createLineItem({
      itemId: 'site-earthwork',
      name: 'Earthwork and excavation',
      unit: 'cft',
      quantity: area * 1.8,
      wastagePct: 3,
      materialRate: 0,
      labourRate: masonRate * 0.62,
      notes: 'Manual earthwork and trench excavation; adjust for soft soil and hard rock.',
      rateSource: rateMap.mason_labour.sourceUrl,
      lastUpdated: rateMap.mason_labour.updatedAt,
      formula: '1.8 × builtUpArea × mason_rate × 0.62',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'site-preparation', name: 'Site preparation and excavation', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const footingStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const cementRate = rateMap.cement_opc.price;
  const sandRate = rateMap.sand_river.price;
  const aggregateRate = rateMap.aggregate_20mm.price;
  const steelRate = rateMap.steel_tmt.price;
  const helperRate = rateMap.helper_labour.price;
  const masonRate = rateMap.mason_labour.price;

  const pccRate = (cementRate * 0.18) + (sandRate * 0.42) + (aggregateRate * 0.35);
  const footingSteelQty = area * 0.36;

  const items = [
    createLineItem({
      itemId: 'footing-pcc',
      name: 'PCC bed',
      unit: 'cft',
      quantity: area * 0.22,
      wastagePct: 5,
      materialRate: pccRate,
      labourRate: masonRate * 0.4,
      notes: 'Lean concrete bed under foundations.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '0.22 × builtUpArea × ((cement_rate × 0.18) + (sand_rate × 0.42) + (aggregate_rate × 0.35))',
    }),
    createLineItem({
      itemId: 'footing-steel',
      name: 'Footing steel',
      unit: 'kg',
      quantity: footingSteelQty,
      wastagePct: 4,
      materialRate: steelRate,
      labourRate: helperRate * 0.18,
      notes: 'Reinforcement for footing and strap beams.',
      rateSource: rateMap.steel_tmt.sourceUrl,
      lastUpdated: rateMap.steel_tmt.updatedAt,
      formula: '0.36 × builtUpArea × steel_rate × 1.04',
    }),
    createLineItem({
      itemId: 'footing-formwork',
      name: 'Footing formwork',
      unit: 'sqft',
      quantity: area * 0.28,
      wastagePct: 6,
      materialRate: 0,
      labourRate: masonRate * 0.55,
      notes: 'Shuttering and centring for footing edges and pads.',
      rateSource: rateMap.mason_labour.sourceUrl,
      lastUpdated: rateMap.mason_labour.updatedAt,
      formula: '0.28 × builtUpArea × mason_rate × 0.55',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'footing-foundation', name: 'Footing / foundation', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const plinthStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const cementRate = rateMap.cement_opc.price;
  const sandRate = rateMap.sand_river.price;
  const aggregateRate = rateMap.aggregate_20mm.price;
  const helperRate = rateMap.helper_labour.price;
  const masonRate = rateMap.mason_labour.price;

  const plinthRate = (cementRate * 0.2) + (sandRate * 0.55) + (aggregateRate * 0.4);

  const items = [
    createLineItem({
      itemId: 'plinth-beam',
      name: 'Plinth beam and DPC',
      unit: 'cft',
      quantity: area * 0.18,
      wastagePct: 4,
      materialRate: plinthRate,
      labourRate: masonRate * 0.38,
      notes: 'Concrete and damp-proof course at plinth level.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '0.18 × builtUpArea × ((cement_rate × 0.2) + (sand_rate × 0.55) + (aggregate_rate × 0.4))',
    }),
    createLineItem({
      itemId: 'plinth-filling',
      name: 'Filling and compaction',
      unit: 'cft',
      quantity: area * 1.3,
      wastagePct: 8,
      materialRate: sandRate * 0.8,
      labourRate: helperRate * 0.7,
      notes: 'Compacted stone dust and earth fill under slabs.',
      rateSource: rateMap.sand_river.sourceUrl,
      lastUpdated: rateMap.sand_river.updatedAt,
      formula: '1.3 × builtUpArea × (sand_rate × 0.8) + helper_rate × 0.7',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'plinth-beam-fill', name: 'Plinth beam and plinth filling', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const columnsStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const cementRate = rateMap.cement_opc.price;
  const sandRate = rateMap.sand_river.price;
  const aggregateRate = rateMap.aggregate_20mm.price;
  const steelRate = rateMap.steel_tmt.price;
  const masonRate = rateMap.mason_labour.price;
  const helperRate = rateMap.helper_labour.price;

  const columnMix = (cementRate * 0.22) + (sandRate * 0.46) + (aggregateRate * 0.38);

  const items = [
    createLineItem({
      itemId: 'column-concrete',
      name: 'Columns and beams concrete',
      unit: 'cft',
      quantity: area * 0.7,
      wastagePct: 5,
      materialRate: columnMix,
      labourRate: masonRate * 0.74,
      notes: 'Structural concrete for columns and beams.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '0.7 × builtUpArea × ((cement_rate × 0.22) + (sand_rate × 0.46) + (aggregate_rate × 0.38))',
    }),
    createLineItem({
      itemId: 'column-steel',
      name: 'Structural steel',
      unit: 'kg',
      quantity: area * 1.1,
      wastagePct: 6,
      materialRate: steelRate,
      labourRate: helperRate * 0.22,
      notes: 'Main and tie reinforcement for columns, beams and shear walls.',
      rateSource: rateMap.steel_tmt.sourceUrl,
      lastUpdated: rateMap.steel_tmt.updatedAt,
      formula: '1.1 × builtUpArea × steel_rate × 1.06',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'columns-structure', name: 'Columns and structure (RCC)', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const slabStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const cementRate = rateMap.cement_opc.price;
  const sandRate = rateMap.sand_river.price;
  const aggregateRate = rateMap.aggregate_20mm.price;
  const steelRate = rateMap.steel_tmt.price;
  const masonRate = rateMap.mason_labour.price;

  const slabMix = (cementRate * 0.24) + (sandRate * 0.44) + (aggregateRate * 0.42);

  const items = [
    createLineItem({
      itemId: 'slab-concrete',
      name: 'Slab concrete',
      unit: 'cft',
      quantity: area * 0.65,
      wastagePct: 5,
      materialRate: slabMix,
      labourRate: masonRate * 0.82,
      notes: 'Concrete for floor slabs and roof deck.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '0.65 × builtUpArea × ((cement_rate × 0.24) + (sand_rate × 0.44) + (aggregate_rate × 0.42))',
    }),
    createLineItem({
      itemId: 'slab-steel',
      name: 'Slab reinforcement',
      unit: 'kg',
      quantity: area * 0.92,
      wastagePct: 6,
      materialRate: steelRate,
      labourRate: masonRate * 0.12,
      notes: 'Top and bottom reinforcement mesh for slab execution.',
      rateSource: rateMap.steel_tmt.sourceUrl,
      lastUpdated: rateMap.steel_tmt.updatedAt,
      formula: '0.92 × builtUpArea × steel_rate × 1.06',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'slab', name: 'Slab', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const masonryStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const brickRate = rateMap.brick_red.price;
  const mortarRate = rateMap.cement_opc.price * 0.12 + rateMap.sand_river.price * 0.35;
  const masonRate = rateMap.mason_labour.price;
  const helperRate = rateMap.helper_labour.price;

  const items = [
    createLineItem({
      itemId: 'masonry-bricks',
      name: 'Brickwork / blockwork',
      unit: 'nos',
      quantity: area * 4.2,
      wastagePct: 5,
      materialRate: brickRate,
      labourRate: masonRate * 0.7,
      notes: 'Load-bearing and partition wall masonry using standard Kota brick or AAC mix.',
      rateSource: rateMap.brick_red.sourceUrl,
      lastUpdated: rateMap.brick_red.updatedAt,
      formula: '4.2 × builtUpArea × brick_rate × 1.05',
    }),
    createLineItem({
      itemId: 'masonry-mortar',
      name: 'Mortar and joint filling',
      unit: 'bag',
      quantity: area * 0.5,
      wastagePct: 6,
      materialRate: mortarRate,
      labourRate: helperRate * 0.65,
      notes: 'Cement-sand mortar for beds, joints and wall finishing.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '0.5 × builtUpArea × ((cement_rate × 0.12) + (sand_rate × 0.35))',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'masonry', name: 'Brickwork / blockwork', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const plasterStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const sandRate = rateMap.sand_river.price;
  const cementRate = rateMap.cement_opc.price;
  const helperRate = rateMap.helper_labour.price;

  const plasterRate = (cementRate * 0.15) + (sandRate * 0.45);

  const items = [
    createLineItem({
      itemId: 'plaster-internal',
      name: 'Internal plaster',
      unit: 'sqft',
      quantity: area * 2.3,
      wastagePct: 8,
      materialRate: plasterRate,
      labourRate: helperRate * 0.7,
      notes: 'Internal wall and ceiling plaster including base coat and finish.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '2.3 × builtUpArea × ((cement_rate × 0.15) + (sand_rate × 0.45))',
    }),
    createLineItem({
      itemId: 'plaster-external',
      name: 'External plaster',
      unit: 'sqft',
      quantity: area * 1.5,
      wastagePct: 8,
      materialRate: plasterRate * 1.08,
      labourRate: helperRate * 0.8,
      notes: 'External wall finish with texture or smooth finish.',
      rateSource: rateMap.cement_opc.sourceUrl,
      lastUpdated: rateMap.cement_opc.updatedAt,
      formula: '1.5 × builtUpArea × overridden_external_plaster_rate',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'plastering', name: 'Plastering', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const flooringStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const tileRate = rateMap.tile_ceramic.price;
  const helperRate = rateMap.helper_labour.price;

  const items = [
    createLineItem({
      itemId: 'floor-tiles',
      name: 'Floor tiles',
      unit: 'sqft',
      quantity: area * 0.9,
      wastagePct: 6,
      materialRate: tileRate,
      labourRate: helperRate * 1.05,
      notes: 'Ceramic or vitrified floor tiles with finish and grout.',
      rateSource: rateMap.tile_ceramic.sourceUrl,
      lastUpdated: rateMap.tile_ceramic.updatedAt,
      formula: '0.9 × builtUpArea × tile_rate × 1.06',
    }),
    createLineItem({
      itemId: 'dado-wall',
      name: 'Dado and skirting',
      unit: 'sqft',
      quantity: area * 0.45,
      wastagePct: 5,
      materialRate: tileRate * 0.9,
      labourRate: helperRate * 0.65,
      notes: 'Bathroom and kitchen vertical tile finish.',
      rateSource: rateMap.tile_ceramic.sourceUrl,
      lastUpdated: rateMap.tile_ceramic.updatedAt,
      formula: '0.45 × builtUpArea × tile_rate × 0.9',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'flooring-tiling', name: 'Flooring and tiling', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const doorsWindowsStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const doorCount = project.doorCount;
  const windowCount = project.windowCount;
  const carpenterRate = rateMap.carpenter_labour.price;

  const items = [
    createLineItem({
      itemId: 'door-frames',
      name: 'Door frames and shutters',
      unit: 'nos',
      quantity: doorCount,
      wastagePct: 2,
      materialRate: 2200,
      labourRate: carpenterRate * 0.9,
      notes: 'Main entry and interior doors as per standard quality tier.',
      rateSource: rateMap.carpenter_labour.sourceUrl,
      lastUpdated: rateMap.carpenter_labour.updatedAt,
      formula: 'doorCount × 2200 + carpenter_rate × 0.9',
    }),
    createLineItem({
      itemId: 'windows',
      name: 'Windows and hardware',
      unit: 'nos',
      quantity: windowCount,
      wastagePct: 3,
      materialRate: 1600,
      labourRate: carpenterRate * 0.6,
      notes: 'Sliding or casement windows with safety fixtures and handles.',
      rateSource: rateMap.carpenter_labour.sourceUrl,
      lastUpdated: rateMap.carpenter_labour.updatedAt,
      formula: 'windowCount × 1600 + carpenter_rate × 0.6',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'doors-windows', name: 'Doors and windows', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const plumbingStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const bathCount = project.bathroomCount;
  const cpvcRate = rateMap.cpvc_pipe.price;
  const fixtureRate = rateMap.sanitary_fixture_set.price;
  const helperRate = rateMap.helper_labour.price;

  const items = [
    createLineItem({
      itemId: 'plumbing-pipes',
      name: 'CPVC piping and fittings',
      unit: 'm',
      quantity: bathCount * 42,
      wastagePct: 8,
      materialRate: cpvcRate,
      labourRate: helperRate * 0.6,
      notes: 'Water supply and drainage piping for bathrooms and kitchen.',
      rateSource: rateMap.cpvc_pipe.sourceUrl,
      lastUpdated: rateMap.cpvc_pipe.updatedAt,
      formula: 'bathroomCount × 42 × cpvc_pipe_rate × 1.08',
    }),
    createLineItem({
      itemId: 'plumbing-fixtures',
      name: 'Bathroom fixtures and water tank',
      unit: 'set',
      quantity: bathCount,
      wastagePct: 5,
      materialRate: fixtureRate,
      labourRate: helperRate * 0.5,
      notes: 'WC, shower, sink and tank connections for sanitary works.',
      rateSource: rateMap.sanitary_fixture_set.sourceUrl,
      lastUpdated: rateMap.sanitary_fixture_set.updatedAt,
      formula: 'bathroomCount × fixture_set_rate × 1.05',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'plumbing-sanitary', name: 'Plumbing and sanitary', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const electricalStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const pointCount = project.bedroomCount * 4 + project.bathroomCount * 3 + project.kitchenCount * 4;
  const wireRate = rateMap.wiring_copper.price;
  const conduitRate = rateMap.conduit_pvc.price;
  const electricianRate = rateMap.electrician_labour.price;

  const items = [
    createLineItem({
      itemId: 'electrical-wiring',
      name: 'Concealed copper wiring',
      unit: 'm',
      quantity: pointCount * 12,
      wastagePct: 7,
      materialRate: wireRate,
      labourRate: electricianRate * 0.6,
      notes: 'Power and lighting cabling via conduits to all points.',
      rateSource: rateMap.wiring_copper.sourceUrl,
      lastUpdated: rateMap.wiring_copper.updatedAt,
      formula: 'pointCount × 12 × wiring_rate × 1.07',
    }),
    createLineItem({
      itemId: 'electrical-switchgear',
      name: 'Switches, MCB and DB',
      unit: 'nos',
      quantity: pointCount,
      wastagePct: 5,
      materialRate: conduitRate * 2,
      labourRate: electricianRate * 0.7,
      notes: 'Switchboards, breakers and distribution board set.',
      rateSource: rateMap.conduit_pvc.sourceUrl,
      lastUpdated: rateMap.conduit_pvc.updatedAt,
      formula: 'pointCount × (conduit_rate × 2) + electrician_rate × 0.7',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'electrical', name: 'Electrical', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const paintingStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const paintRate = rateMap.paint_interior.price;
  const helperRate = rateMap.helper_labour.price;

  const items = [
    createLineItem({
      itemId: 'painting-putty',
      name: 'Putty and primer',
      unit: 'sqft',
      quantity: area * 2.1,
      wastagePct: 8,
      materialRate: paintRate * 0.38,
      labourRate: helperRate * 0.8,
      notes: 'Wall preparation with putty and primer for finish coats.',
      rateSource: rateMap.paint_interior.sourceUrl,
      lastUpdated: rateMap.paint_interior.updatedAt,
      formula: '2.1 × builtUpArea × (paint_rate × 0.38)',
    }),
    createLineItem({
      itemId: 'painting-finish',
      name: 'Interior and exterior paint',
      unit: 'litre',
      quantity: area * 0.22,
      wastagePct: 12,
      materialRate: paintRate,
      labourRate: helperRate * 0.62,
      notes: 'Topcoat for internal and external surfaces.',
      rateSource: rateMap.paint_interior.sourceUrl,
      lastUpdated: rateMap.paint_interior.updatedAt,
      formula: '0.22 × builtUpArea × paint_rate × 1.12',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'painting-finishing', name: 'Painting and finishing', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

const miscellaneousStage = (project: ProjectInput, rateMap: Record<string, RateRecord>): StageResult => {
  const area = project.builtUpAreaSqFt;
  const helperRate = rateMap.helper_labour.price;

  const items = [
    createLineItem({
      itemId: 'misc-railings',
      name: 'Railing, gate and parapet',
      unit: 'nos',
      quantity: 1,
      wastagePct: 0,
      materialRate: 18000,
      labourRate: helperRate * 0.5,
      notes: 'Boundary and terrace finishing extras.',
      rateSource: rateMap.helper_labour.sourceUrl,
      lastUpdated: rateMap.helper_labour.updatedAt,
      formula: '1 × 18000 + helper_rate × 0.5',
    }),
    createLineItem({
      itemId: 'misc-waterproof',
      name: 'Terrace waterproofing',
      unit: 'sqft',
      quantity: area * 0.38,
      wastagePct: 8,
      materialRate: 45,
      labourRate: helperRate * 0.65,
      notes: 'Waterproofing layer for terrace and wet areas.',
      rateSource: rateMap.helper_labour.sourceUrl,
      lastUpdated: rateMap.helper_labour.updatedAt,
      formula: '0.38 × builtUpArea × 45 + helper_rate × 0.65',
    }),
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { stageKey: 'miscellaneous', name: 'Miscellaneous', items, subtotal, percentOfProject: 0, range: getStageRange(subtotal) };
};

export const stageFactories = [
  sitePreparationStage,
  footingStage,
  plinthStage,
  columnsStage,
  slabStage,
  masonryStage,
  plasterStage,
  flooringStage,
  doorsWindowsStage,
  plumbingStage,
  electricalStage,
  paintingStage,
  miscellaneousStage,
];

export const getBillOfMaterials = (project: ProjectInput): BillOfMaterials => {
  const area = project.builtUpAreaSqFt;
  return {
    cementBags: Math.round(area * 0.42),
    steelKg: Math.round(area * 2.4),
    sandCft: Math.round(area * 2.8),
    aggregateCft: Math.round(area * 2.15),
    bricksNos: Math.round(area * 4.8),
  };
};

export const buildEstimate = (
  input: Partial<ProjectInput> = {},
  overrides: Record<string, number> = {},
  modifiers: Partial<ProjectSettings> = {},
): EstimateResult => {
  const project = { ...defaultProject, ...input };
  const settings = { ...defaultModifiers, ...modifiers };
  const region = project.region ?? 'Kota';
  const rateMap = getProjectRates(region, overrides);

  const stages = stageFactories.map((stageFactory) => stageFactory(project, rateMap));
  const totalBeforeModifiers = stages.reduce((sum, stage) => sum + stage.subtotal, 0);
  const projectTotal = roundCurrency(
    totalBeforeModifiers * (1 + settings.gstPercent / 100 + settings.contractorProfitPercent / 100 + settings.contingencyPercent / 100),
  );

  const stagesWithPercent = stages.map((stage) => ({
    ...stage,
    percentOfProject: totalBeforeModifiers === 0 ? 0 : Number(((stage.subtotal / totalBeforeModifiers) * 100).toFixed(2)),
  }));

  return {
    projectName: project.projectName,
    projectTotal,
    totalBeforeModifiers: roundCurrency(totalBeforeModifiers),
    perSqFt: Math.round(projectTotal / Math.max(project.builtUpAreaSqFt, 1)),
    stages: stagesWithPercent,
    bom: getBillOfMaterials(project),
    modifiers: settings,
    generatedAt: new Date().toISOString(),
  };
};

export default buildEstimate;
