import React from 'react';
import { css } from '@emotion/react';
import { PaintDetails, PaintGradient } from '../types/app.types';

const getColorByBgColor = (bgColor: string) => {
  const colour = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(colour.substring(0, 2), 16); // hexToR
  const g = parseInt(colour.substring(2, 4), 16); // hexToG
  const b = parseInt(colour.substring(4, 6), 16); // hexToB
  const uiColors = [r / 255, g / 255, b / 255];
  const c = uiColors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? '#292929' : '#fff';
};

const getStopGradients = (gradient: PaintGradient[]) => {
  const gradients: JSX.Element[] = [];
  if (gradient) {
    for (const g of gradient) {
      gradients.push(
        <stop
          offset={`${g.offset}%`}
          stopColor={g.color}
          stopOpacity="1"
          key={g.offset}
        />
      );
    }
    return gradients;
  }
};

const getGradients = ({
  gradient,
  type,
  hex,
  name,
  gloss,
}: {
  gradient: PaintGradient[] | undefined;
  type: string;
  hex: string;
  name: string;
  gloss: boolean | undefined;
}) => {
  if (gradient) {
    const gradients: JSX.Element[] = [];
    if (type === 'contrast') {
      gradients.push(
        <linearGradient
          y1="0%"
          x1="100%"
          x2="0%"
          y2="0%"
          id={`${type}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${type}`}
        >
          {getStopGradients(gradient)}
        </linearGradient>
      );
    } else if (type === 'shade' || type === 'technical') {
      gradients.push(
        <linearGradient
          y1="100%"
          x1="0%"
          x2="0%"
          y2="0%"
          id={`${type}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${type}`}
        >
          {getStopGradients(gradient)}
        </linearGradient>
      );
    } else {
      gradients.push(
        <radialGradient
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(25 32) scale(39)"
          id={`${type}_gradient_${hex.substring(1, 7)}`}
          key={`${name}_${type}`}
        >
          {getStopGradients(gradient)}
        </radialGradient>
      );
    }
    if (gloss) {
      gradients.push(
        <radialGradient
          id={`${type}_gloss_gradient_${hex.substring(1, 7)}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(14.5226 43.0942) rotate(25.9038) scale(62.7474 27.1872)"
          key={`${name}_${type}_gloss`}
        >
          <stop stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
      );
    }
    return <defs>{gradients}</defs>;
  } else {
    return null;
  }
};

const getText = ({
  type,
  hex,
  gradient,
}: {
  type: string;
  hex: string;
  gradient: PaintGradient[] | undefined;
}) => {
  if (type === 'dry') {
    return (
      <g
        transform="translate(16 48), scale(.5 .5)"
        fill={gradient ? '#292929' : getColorByBgColor(hex)}
      >
        <g clipPath="url(#clip_dry)">
          <path d="M3.897.074c4.985 0 7.6 2.42 7.6 6.998 0 5.062-2.633 7.798-7.565 7.798-1.387-.019-2.686-.168-3.932-.559V.67C1.018.298 2.334.074 3.897.074zm.087 12.73c3.511 0 5.231-1.824 5.231-5.583 0-3.424-1.702-5.1-5.16-5.1-.527 0-1.159.038-1.826.15v10.365a9.923 9.923 0 0 0 1.755.168zM21.765 15l-5.248-7.872c2.633 0 3.914-.763 3.914-2.457 0-1.693-1.036-2.568-3.072-2.568-.509 0-.965.019-1.456.112V14.59c-.387.093-.738.13-1.141.13-.386 0-.72-.037-1.071-.13V.428C15.06.205 16.254.074 17.289.074c3.581 0 5.477 1.582 5.477 4.355 0 1.936-1.053 3.276-3.037 3.815l3.985 5.286c-.457.744-1.106 1.228-1.949 1.47zM29.295 6.774L33 0c.86.112 1.492.521 2.001 1.191l-4.599 7.612v5.788c-.333.093-.72.111-1.088.111-.386 0-.737-.018-1.123-.111V8.803l-4.6-7.612C24.1.502 24.75.111 25.593 0l3.703 6.774z" />
        </g>
        <defs>
          <clipPath id="clip_dry">
            <path d="M0 0h35v15H0z" />
          </clipPath>
        </defs>
      </g>
    );
  } else if (type === 'air') {
    return (
      <g
        transform="translate(16 48), scale(.5 .5)"
        fill={gradient ? '#292929' : getColorByBgColor(hex)}
      >
        <g clipPath="url(#clip_air)">
          <path d="M11.2 15.85l-1.4-3.26H3.3c-.5 1.3-.76 1.94-1.25 3.24-.79 0-1.48-.33-2.05-1L6.42 0c2.26 4.94 4.52 9.88 6.8 14.8-.55.66-1.24 1-2.03 1.04zM6.41 4.77c-.78 1.91-1.58 3.83-2.36 5.77h4.89L6.42 4.77zM15.82 15.67c-.43 0-.78-.02-1.1-.12V.68a4.58 4.58 0 0 1 2.22 0v14.87c-.32.1-.7.12-1.12.12zM28.02 16L22.7 7.79c1.55.1 3.99-.37 3.97-2.56-.02-1.74-1.05-2.67-3.11-2.67-.52 0-.98.02-1.48.11v12.88a4.62 4.62 0 0 1-2.24 0V.81c1.39-.23 2.63-.34 3.65-.36 2.52-.08 5.55 1.33 5.55 4.53 0 2-1.32 3.54-3.08 3.97 1.35 1.84 2.69 3.68 4.04 5.5A3.41 3.41 0 0 1 28.02 16z" />
        </g>
        <defs>
          <clipPath id="clip_air">
            <path d="M0 0h30v16H0z" />
          </clipPath>
        </defs>
      </g>
    );
  } else {
    return null;
  }
};

const getShape = ({
  gradient,
  type,
  hex,
  stroke,
}: {
  gradient: PaintGradient[] | undefined;
  type: string;
  hex: string;
  stroke: string | undefined;
}) => {
  let d;
  if (type === 'spray') {
    d =
      'M37.0579 14.6557C35.9063 13.9672 34.7548 13.377 33.4986 12.7869C33.3939 12.7869 33.2893 12.6885 33.2893 12.5902C32.3471 11.0164 31.3003 9.44262 30.0441 7.96721C29.8347 7.67213 29.5207 7.37705 29.3113 7.18033C29.1019 6.98361 28.7879 6.88525 28.4738 6.78689C28.3691 6.78689 28.3691 6.78689 28.2645 6.78689C26.3802 6.78689 24.4959 6.78689 22.6116 6.78689L22.7163 6.68852C22.8209 6.39344 22.9256 6.09836 22.9256 5.80328C22.9256 4.13115 22.9256 2.36066 22.9256 0.688525C22.9256 0.295082 22.7163 0.0983607 22.2975 0C21.9835 0 21.7741 0 21.4601 0C20.9366 0.0983607 20.5179 0 19.9945 0H17.6915C17.5868 0 17.4821 0 17.3774 0C16.5399 0.0983607 15.5978 0.0983607 14.7603 0.196721C14.4463 0.196721 14.2369 0.491803 14.1322 0.688525C14.1322 0.885246 14.1322 0.983607 14.1322 1.18033C14.1322 2.85246 14.1322 4.52459 14.1322 6.19672C14.1322 6.29508 14.1322 6.39344 14.1322 6.4918C14.1322 6.68852 14.2369 6.78689 14.4463 6.88525C12.6667 6.88525 10.9917 6.88525 9.21212 6.88525C8.68871 6.88525 8.26997 7.08197 7.95592 7.37705C6.28099 9.2459 4.92011 11.3115 3.76859 13.4754C3.66391 13.5738 3.55923 13.6721 3.45455 13.7705C2.61708 14.2623 1.67493 14.8525 0.732782 15.3443C0.209366 15.541 0 16.0328 0 16.5246C0 16.623 0 16.7213 0 16.7213C0 28.4262 0 43.9672 0 55.6721C0 55.6721 5.65289 60 19.0523 60C32.4518 60 38 55.7705 38 55.7705V15.7377C37.8953 15.1475 37.4766 14.8525 37.0579 14.6557Z';
  } else {
    d =
      'M34.9927 3.31021C34.0377 1.87791 29.0583 0.923096 24.4199 0.923096C19.7814 0.923096 16.0844 2.00071 14.3927 3.31021C8.73112 4.94709 5.1841 8.56187 4.63841 11.5628C4.09271 14.5638 0 46.0055 0 48.7337C0 51.4618 4.50198 61.6923 25.3066 61.6923C46.1112 61.6923 49.9311 51.3254 49.9993 48.7337C50.0675 46.142 45.0198 10.7444 45.0198 10.7444C44.2695 5.76553 35.6748 3.37842 34.9927 3.31021Z';
  }
  if (stroke) {
    return (
      <path
        d={d}
        fill={gradient ? `url(#${type}_gradient_${hex.substring(1, 7)})` : hex}
        stroke={stroke}
        strokeWidth={1}
        strokeMiterlimit={5}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        shapeRendering={'#geometricPrecision'}
      />
    );
  } else {
    return (
      <path
        d={d}
        fill={gradient ? `url(#${type}_gradient_${hex.substring(1, 7)})` : hex}
      />
    );
  }
};

const getGloss = ({
  type,
  hex,
  gloss,
}: {
  type: string;
  hex: string;
  gloss: boolean | undefined;
}) => {
  if (gloss) {
    return (
      <path
        strokeWidth="0"
        transform="translate(3 -12), rotate(8), scale(.9 1)"
        d="M30.3838 0C37.0767 0 44.2617 1.40119 45.6397 3.50309C46.624 3.60317 59.0255 7.10626 60.1082 14.4127C60.1082 14.4127 65.5144 54.5929 67 68C42.9236 10.8991 24.078 71.1205 0 30.0167C0.790912 24.0011 1.61801 16.8579 1.84047 15.6138C2.62787 11.2099 7.74598 5.9052 15.9153 3.50309C18.3562 1.58139 23.6909 0 30.3838 0Z"
        fill={`url(#${type}_gloss_gradient_${hex.substring(1, 7)})`}
      />
    );
  }
};

const getSVG = ({
  name,
  type,
  hex,
  gradient,
  stroke,
  gloss,
  img,
}: PaintDetails): JSX.Element => {
  if (img) {
    return img;
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

const Paint = ({
  paint,
  size = 60,
}: {
  paint: PaintDetails;
  size?: number;
}): JSX.Element => {
  const paintStyles = css`
    display: inline-block;
    margin: 0.2rem;
    width: ${size}px;
  `;

  const paintWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  const paintTextStyles = css`
    flex: 1;
    font-size: 0.6rem;
    line-height: 1rem;
    text-align: center;
    max-width: 100%;
  `;

  const paintSVGWrapperStyles = css``;

  const { name, type, color, hex, gradient, stroke, gloss, img, availability } =
    paint;

  return (
    <div data-testid="paint" css={paintStyles}>
      <div css={paintWrapperStyles}>
        <div css={paintSVGWrapperStyles}>
          {getSVG({
            name,
            type,
            color,
            hex,
            gradient,
            stroke,
            gloss,
            img,
            availability,
          })}
        </div>
        <div css={paintTextStyles}>{name}</div>
      </div>
    </div>
  );
};

export default Paint;
