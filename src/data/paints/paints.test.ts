import { getCategoryCompany } from '../../types';
import { paintId } from '../../util/paintId';
import { allPaints } from '.';

describe('paint data', () => {
  it('has no duplicate paints (same company, name and category)', () => {
    const seen = new Set<string>();
    const duplicates = allPaints
      .map(paintId)
      .filter((id) => seen.has(id) || !seen.add(id));
    expect(duplicates).toEqual([]);
  });

  it('gives every paint a category belonging to its company', () => {
    const mismatched = allPaints
      .filter((paint) => getCategoryCompany(paint.category) !== paint.company)
      .map(paintId);
    expect(mismatched).toEqual([]);
  });
});
