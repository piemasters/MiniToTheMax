import { CitadelTechnicalPaintImages } from '../../../types';
import AgrellanBadland from '../../../../content/assets/svg/paints/technicalAgrellanBadland.svg';
import AgrellanEarth from '../../../../content/assets/svg/paints/technicalAgrellanEarth.svg';
import ArmageddonDunes from '../../../../content/assets/svg/paints/technicalArmageddonDunes.svg';
import ArmageddonDust from '../../../../content/assets/svg/paints/technicalArmageddonDust.svg';
import Astrogranite from '../../../../content/assets/svg/paints/technicalAstrogranite.svg';
import AstrograniteDebris from '../../../../content/assets/svg/paints/technicalAstrograniteDebris.svg';
import MartianIroncrust from '../../../../content/assets/svg/paints/technicalMartianIroncrust.svg';
import MartianIronearth from '../../../../content/assets/svg/paints/technicalMartianIronearth.svg';
import MordantEarth from '../../../../content/assets/svg/paints/technicalMordantEarth.svg';
import StirlandBattlemire from '../../../../content/assets/svg/paints/technicalStirlandBattlemire.svg';
import StirlandMud from '../../../../content/assets/svg/paints/technicalStirlandMud.svg';
import ValhallanBlizzard from '../../../../content/assets/svg/paints/technicalValhallanBlizzard.svg';

const paintImages = {
  AgrellanBadland: <AgrellanBadland />,
  AgrellanEarth: <AgrellanEarth />,
  ArmageddonDunes: <ArmageddonDunes />,
  ArmageddonDust: <ArmageddonDust />,
  Astrogranite: <Astrogranite />,
  AstrograniteDebris: <AstrograniteDebris />,
  MartianIroncrust: <MartianIroncrust />,
  MartianIronearth: <MartianIronearth />,
  MordantEarth: <MordantEarth />,
  StirlandBattlemire: <StirlandBattlemire />,
  StirlandMud: <StirlandMud />,
  ValhallanBlizzard: <ValhallanBlizzard />,
};

export const getImage = (name: CitadelTechnicalPaintImages) => {
  return paintImages[name];
};
