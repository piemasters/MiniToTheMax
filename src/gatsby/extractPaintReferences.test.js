const { extractPaintReferences } = require('./extractPaintReferences');

describe('extractPaintReferences', () => {
  it('reads every quoting style, with and without a category', () => {
    const source = `
      <Paint name={'Abaddon Black'} />
      <Paint name="Leadbelcher" />
      <Paint name={"Brass Scorpion"} category="Vallejo Game Color" />
      <Paint name={'Nurgles Rot'} category={'Citadel Air'} />
    `;
    expect(extractPaintReferences(source)).toEqual([
      'Abaddon Black',
      'Leadbelcher',
      'Brass Scorpion::Vallejo Game Color',
      'Nurgles Rot::Citadel Air',
    ]);
  });

  it('lists each paint once and unescapes quotes', () => {
    const source = `<Paint name={'Dryad\\'s Bark'} /><Paint name={'Dryad\\'s Bark'} />`;
    expect(extractPaintReferences(source)).toEqual(["Dryad's Bark"]);
  });

  it('ignores other components and plain text', () => {
    expect(extractPaintReferences('<Gallery name="x" /> Paint name')).toEqual(
      []
    );
  });
});
