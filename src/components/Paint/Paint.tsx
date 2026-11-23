import { FC } from 'react';
import VallejoPaint from './vallejo/VallejoPaint';
import CitadelPaint from './citadel/CitadelPaint';
import IonicPaint from './ionic/IonicPaint';
import type {
  PaintDetails,
  CitadelPaintCategory,
  CitadelTechnicalPaintImages,
  VallejoPaintCategory,
  IonicPaintCategory,
} from './types';

export const Paint: FC<{ paint: PaintDetails }> = ({ paint }) => {
  if (paint.company === 'Vallejo') {
    return (
      <VallejoPaint
        name={paint.name}
        type={paint.type}
        color={paint.color}
        hex={paint.hex}
        gradient={paint.gradient}
        availability={paint.availability}
        company={paint.company}
        category={paint.category as VallejoPaintCategory}
        stroke={paint.stroke}
        gloss={paint.gloss}
        img={paint.img}
        number={paint.number || ''}
      />
    );
  } else if (paint.company === 'Ionic') {
    return (
      <IonicPaint
        name={paint.name}
        type={paint.type}
        color={paint.color}
        hex={paint.hex}
        gradient={paint.gradient}
        availability={paint.availability}
        company={paint.company}
        category={paint.category as IonicPaintCategory}
        stroke={paint.stroke}
        gloss={paint.gloss}
        img={paint.img}
      />
    );
  }
  return (
    <CitadelPaint
      name={paint.name}
      type={paint.type}
      color={paint.color}
      hex={paint.hex}
      gradient={paint.gradient}
      availability={paint.availability}
      company={paint.company as 'Citadel'}
      category={paint.category as CitadelPaintCategory}
      stroke={paint.stroke}
      gloss={paint.gloss}
      img={paint.img as CitadelTechnicalPaintImages | undefined}
    />
  );
};

export default Paint;
