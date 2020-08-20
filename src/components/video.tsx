import React from 'react';
import { css } from '@emotion/core';
import { Theme } from '../styles/theme';
import { useTheme } from 'emotion-theming';

interface VideoProps {
  src: string;
  title: string;
  width?: number;
  aspectRatio?: number;
}

const Video = ({
  src,
  title,
  width = 714,
  aspectRatio = 16 / 9,
}: VideoProps) => {
  const theme: Theme = useTheme();

  const videoStyle = css`
    iframe {
      &:hover {
        box-shadow: 6px 6px 60px 5px ${theme.colors.backgroundTransparent};
      }
    }
  `;
  return (
    <div css={videoStyle} data-testid="video">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
        width={'100%'}
        height={width / aspectRatio}
      />
    </div>
  );
};
export default Video;
