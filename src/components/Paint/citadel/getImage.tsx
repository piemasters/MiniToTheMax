import type { CitadelTechnicalPaintImages } from '../../../types';
import { SWATCH_HEIGHT, SWATCH_WIDTH } from '../shared/potViewBox';

import AgrellanBadland from '../../../../content/assets/svg/paints/technicalAgrellanBadland.webp';
import AgrellanEarth from '../../../../content/assets/svg/paints/technicalAgrellanEarth.webp';
import ArmageddonDunes from '../../../../content/assets/svg/paints/technicalArmageddonDunes.webp';
import ArmageddonDust from '../../../../content/assets/svg/paints/technicalArmageddonDust.webp';
import Astrogranite from '../../../../content/assets/svg/paints/technicalAstrogranite.webp';
import AstrograniteDebris from '../../../../content/assets/svg/paints/technicalAstrograniteDebris.webp';
import MartianIroncrust from '../../../../content/assets/svg/paints/technicalMartianIroncrust.webp';
import MartianIronearth from '../../../../content/assets/svg/paints/technicalMartianIronearth.webp';
import MordantEarth from '../../../../content/assets/svg/paints/technicalMordantEarth.webp';
import StirlandBattlemire from '../../../../content/assets/svg/paints/technicalStirlandBattlemire.webp';
import StirlandMud from '../../../../content/assets/svg/paints/technicalStirlandMud.webp';
import ValhallanBlizzard from '../../../../content/assets/svg/paints/technicalValhallanBlizzard.webp';

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
