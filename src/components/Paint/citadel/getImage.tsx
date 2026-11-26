import type { CitadelTechnicalPaintImages } from '../../../types';
import { SWATCH_HEIGHT, SWATCH_WIDTH } from '../shared/potViewBox';

import AgrellanBadland from '../../../../content/assets/svg/paints/technicalAgrellanBadland.webp?url';
import AgrellanEarth from '../../../../content/assets/svg/paints/technicalAgrellanEarth.webp?url';
import ArmageddonDunes from '../../../../content/assets/svg/paints/technicalArmageddonDunes.webp?url';
import ArmageddonDust from '../../../../content/assets/svg/paints/technicalArmageddonDust.webp?url';
import Astrogranite from '../../../../content/assets/svg/paints/technicalAstrogranite.webp?url';
import AstrograniteDebris from '../../../../content/assets/svg/paints/technicalAstrograniteDebris.webp?url';
import MartianIroncrust from '../../../../content/assets/svg/paints/technicalMartianIroncrust.webp?url';
import MartianIronearth from '../../../../content/assets/svg/paints/technicalMartianIronearth.webp?url';
import MordantEarth from '../../../../content/assets/svg/paints/technicalMordantEarth.webp?url';
import StirlandBattlemire from '../../../../content/assets/svg/paints/technicalStirlandBattlemire.webp?url';
import StirlandMud from '../../../../content/assets/svg/paints/technicalStirlandMud.webp?url';
import ValhallanBlizzard from '../../../../content/assets/svg/paints/technicalValhallanBlizzard.webp?url';

const paintImages: Record<CitadelTechnicalPaintImages, string> = {
  AgrellanBadland,
  AgrellanEarth,
  ArmageddonDunes,
  ArmageddonDust,
  Astrogranite,
  AstrograniteDebris,
  MartianIroncrust,
  MartianIronearth,
  MordantEarth,
  StirlandBattlemire,
  StirlandMud,
  ValhallanBlizzard,
};

export const getImage = (name: CitadelTechnicalPaintImages) => {
  return (
    <img
      src={paintImages[name]}
      alt=""
      height={SWATCH_HEIGHT}
      width={SWATCH_WIDTH}
    />
  );
};
