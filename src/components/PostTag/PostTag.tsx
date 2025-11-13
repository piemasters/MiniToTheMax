import { FC } from 'react';
import kebabCase from 'lodash.kebabcase';
import { PageLink } from '../PageLink/PageLink';

export const PostTag: FC<{
  name: string;
  type: string;
}> = ({ name, type }) => {
  return (
    <div data-testid="post-tag" className="inline-block">
      <div className="inline-block px-2 py-1 m-1 bg-gray-200 rounded-md cursor-pointer hover:bg-red-500 text-gray-800 hover:text-white! text-xs">
        <PageLink
          key={name}
          to={`/${type}/${kebabCase(name)}/`}
          type={'cover'}
          direction={'up'}
          className="no-underline"
        >
          {name}
        </PageLink>
      </div>
    </div>
  );
};

export default PostTag;
