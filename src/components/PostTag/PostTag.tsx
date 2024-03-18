import React, { FC } from 'react';
import kebabCase from 'lodash.kebabcase';

import { PageLink } from '../PageLink';

export interface PostTagProps {
  name: string;
  type: string;
}

export const PostTag: FC<PostTagProps> = ({ name, type }) => {
  return (
    <div data-testid="post-tag" className="inline-block">
      <PageLink
        key={name}
        to={`/${type}/${kebabCase(name)}/`}
        className="bg-gray-200 rounded-md text-gray-800 cursor-pointer inline-block text-xs m-1 px-2 py-1 no-underline hover:bg-red-500 hover:text-white"
        type={'cover'}
        direction={'up'}
      >
        {name}
      </PageLink>
    </div>
  );
};

export default PostTag;
