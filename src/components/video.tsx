import React from 'react';

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
}: VideoProps) => (
  <div data-testid="video">
    <iframe
      src={src}
      title={title}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
      width={width}
      height={width / aspectRatio}
    />
  </div>
);
export default Video;
