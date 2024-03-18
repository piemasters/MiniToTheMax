import React, { FC } from 'react';

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
  return (
    <div className="hover:shadow-3xl" data-testid="video">
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
