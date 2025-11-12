import { FC } from 'react';
import LiteYouTubeEmbed from './LiteYoutubeEmbbed';

export const Video: FC<{
  videoId: string;
  title: string;
  width?: number;
  height?: number;
  aspectHeight?: number;
  aspectWidth?: number;
}> = ({ videoId, title, aspectWidth = 16, aspectHeight = 9 }) => {
  return (
    <div className="w-full max-w-3xl mb-4 hover:shadow-3xl" data-testid="video">
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        aspectHeight={aspectHeight}
        aspectWidth={aspectWidth}
      />
      {/* Default method replaced with LiteYouTubeEmbed to improve performance */}
      {/* <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        width={'100%'}
        height={714 / (aspectWidth / aspectHeight)}
      /> */}
    </div>
  );
};
export default Video;
