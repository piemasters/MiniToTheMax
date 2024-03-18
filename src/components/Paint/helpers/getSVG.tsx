import React, { FC } from 'react';

import { PaintDetails } from '../../../types';
import { getGloss } from './getGloss';
import { getGradients } from './getGradients';
import { getShape } from './getShape';
import { getText } from './getText';

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

const paintTypes = {
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

export const getSVG: FC<PaintDetails> = ({
  name,
  type,
  hex,
  gradient,
  stroke,
  gloss,
  img,
}) => {
  if (img) {
    return paintTypes[img];
  } else {
    return (
      <svg viewBox="-1 0 52 62" xmlns="http://www.w3.org/2000/svg">
        {getShape({ gradient, type, hex, stroke })}
        {getGradients({ gradient, type, hex, name, gloss })}
        {getGloss({ type, hex, gloss })}
        {getText({ type, hex, gradient })}
      </svg>
    );
  }
};
