import { describe, expect, it } from 'vitest';
import { buildEstimate, defaultProject, getBillOfMaterials } from './index';

describe('BuildSpace estimation engine', () => {
  it('matches the documented 1,000 sq ft G+0 reference range', () => {
    const estimate = buildEstimate({
      ...defaultProject,
      projectName: 'Reference 1k House',
      builtUpAreaSqFt: 1000,
      plotAreaSqFt: 1200,
      floors: 1,
      region: 'Kota',
    });

    expect(estimate.projectTotal).toBeGreaterThan(12_500_000);
    expect(estimate.projectTotal).toBeLessThan(18_000_000);
    expect(estimate.stages).toHaveLength(13);
  });

  it('keeps every line item internally consistent', () => {
    const estimate = buildEstimate({
      ...defaultProject,
      builtUpAreaSqFt: 1200,
      region: 'Kota',
    });

    for (const stage of estimate.stages) {
      for (const item of stage.items) {
        expect(item.materialCost + item.labourCost).toBe(item.total);
        expect(item.quantity).toBeGreaterThan(0);
        expect(item.materialRate).toBeGreaterThanOrEqual(0);
        expect(item.labourRate).toBeGreaterThanOrEqual(0);
      }
      expect(stage.subtotal).toBeGreaterThan(0);
    }
  });

  it('produces a realistic BOM for ordering', () => {
    const project = {
      ...defaultProject,
      builtUpAreaSqFt: 1000,
      plotAreaSqFt: 1200,
      region: 'Kota',
    };
    const bom = getBillOfMaterials(project);

    expect(bom.cementBags).toBeGreaterThan(200);
    expect(bom.steelKg).toBeGreaterThan(2000);
    expect(bom.sandCft).toBeGreaterThan(2000);
    expect(bom.aggregateCft).toBeGreaterThan(1500);
    expect(bom.bricksNos).toBeGreaterThan(4000);
  });
});
