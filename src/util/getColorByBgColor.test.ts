import { getColorByBgColor } from './getColorByBgColor';

describe('getColorByBgColor', () => {
  it('returns #292929 for light background colors', () => {
    expect(getColorByBgColor('#FFFFFF')).toBe('#292929'); // White
    expect(getColorByBgColor('#F0F0F0')).toBe('#292929'); // Light gray
    expect(getColorByBgColor('#FFD700')).toBe('#292929'); // Gold
  });

  it('returns #fff for dark background colors', () => {
    expect(getColorByBgColor('#000000')).toBe('#fff'); // Black
    expect(getColorByBgColor('#1A1A1A')).toBe('#fff'); // Very dark gray
    expect(getColorByBgColor('#4B0082')).toBe('#fff'); // Indigo
  });

  it('handles colors without a leading #', () => {
    expect(getColorByBgColor('FFFFFF')).toBe('#292929'); // White
    expect(getColorByBgColor('000000')).toBe('#fff'); // Black
  });

  it('handles edge cases for borderline luminance values', () => {
    expect(getColorByBgColor('#2E2E2E')).toBe('#fff'); // Dark gray close to threshold
    expect(getColorByBgColor('#BFBFBF')).toBe('#292929'); // Light gray close to threshold
  });
});
