import React from 'react';
import { Theme } from '../styles/theme';
import { css, useTheme } from '@emotion/react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const CoverImage = ({
  image,
  title,
  tall = false,
}: {
  image: IGatsbyImageData;
  title: string;
  tall?: boolean;
}): JSX.Element => {
  const theme = useTheme() as Theme;

  const headerContainer = css`
    position: relative;
  `;

  const postHeaderStyle = css`
    background-color: ${theme.colors.backgroundTransparent};
    bottom: ${tall ? '20px' : '0px'};
    color: ${theme.colors.textLight};
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    position: absolute;
    right: 1rem;
  `;

  return (
    <div css={headerContainer} data-testid="cover-image">
      <GatsbyImage
        alt={'test'}
        image={image}
        css={css`
          position: initial;
        `}
      />
      <h2 css={postHeaderStyle}>{title}</h2>
    </div>
  );
};

export default CoverImage;
