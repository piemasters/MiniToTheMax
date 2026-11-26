import { DiscussionEmbed } from 'disqus-react';

export const Comments = ({
  shortname,
  identifier,
  title,
  url,
}: {
  shortname: string;
  identifier: string;
  title: string;
  url: string;
}) => (
  <DiscussionEmbed shortname={shortname} config={{ identifier, title, url }} />
);
