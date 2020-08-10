import React from 'react';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import Img from 'gatsby-image';
import { FluidObject } from 'gatsby-image/index';

const CoverImage = ({
  image,
  title,
  tall = false,
}: {
  image: FluidObject;
  title: string;
  tall?: boolean;
}) => {
  const theme: Theme = useTheme();

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
      <Img fluid={image} />
      <h2 css={postHeaderStyle}>{title}</h2>
    </div>
  );
};

export default CoverImage;
