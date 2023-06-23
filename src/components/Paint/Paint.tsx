import type { FC } from 'react';
import { css } from '@emotion/react';

import { PaintDetails } from '../../types';
import { getSVG } from './helpers';

export interface PaintProps {
  paint: PaintDetails;
  size?: number;
}

export const Paint: FC<PaintProps> = ({ paint, size = 60 }) => {
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
