import {
  AllPaintCategories,
  getCategoryCompany,
  PaintCompanies,
} from './paint.types';

describe('paint types', () => {
  it('lists companies in registration order', () => {
    expect(PaintCompanies).toEqual(['Citadel', 'Vallejo', 'Ionic']);
  });

  it('keeps category priority order: Citadel, then Vallejo, then Ionic', () => {
    expect(AllPaintCategories[0]).toBe('Citadel Base');
    expect(AllPaintCategories.at(-1)).toBe('IONIC Smart Colors');
  });

  it.each([
    ['Citadel Base', 'Citadel'],
    ['Vallejo Liquid Metal', 'Vallejo'],
    // Prefix casing differs from the company name
    ['IONIC Smart Colors', 'Ionic'],
    ['Not A Category', undefined],
  ])('maps %s to %s', (category, company) => {
    expect(getCategoryCompany(category)).toBe(company);
  });
});
