import type { FC } from 'react';
import { css, useTheme } from '@emotion/react';

import { Theme } from '../styles/theme';

export interface VideoProps {
  src: string;
  title: string;
  width?: number;
  aspectRatio?: number;
}

export const Video: FC<VideoProps> = ({
  src,
  title,
  width = 714,
  aspectRatio = 16 / 9,
}) => {
  const theme = useTheme() as Theme;

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
