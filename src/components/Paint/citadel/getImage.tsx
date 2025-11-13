import type { CitadelTechnicalPaintImages } from '../types';

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

const paintImages = {
  AgrellanBadland: AgrellanBadland,
  AgrellanEarth: AgrellanEarth,
  ArmageddonDunes: ArmageddonDunes,
  ArmageddonDust: ArmageddonDust,
  Astrogranite: Astrogranite,
  AstrograniteDebris: AstrograniteDebris,
  MartianIroncrust: MartianIroncrust,
  MartianIronearth: MartianIronearth,
  MordantEarth: MordantEarth,
  StirlandBattlemire: StirlandBattlemire,
  StirlandMud: StirlandMud,
  ValhallanBlizzard: ValhallanBlizzard,
};

export const getImage = (name: CitadelTechnicalPaintImages) => {
  return <img src={paintImages[name]} alt={name} height="71px" width="57px" />;
};
