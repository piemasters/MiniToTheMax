import { FC } from 'react';

import { Facebook, Instagram, Youtube } from '../../data/icons';

export interface FooterProps {
  author: string;
}

export const Footer: FC<FooterProps> = ({ author }) => {
  return (
    <footer data-testid="footer" className="py-8 mt-12 bg-gray-100">
      <div className="flex items-center justify-end max-w-3xl px-4 mx-auto text-sm no-underline">
        <a
          className="text-blue-500 hover:text-blue-700"
          href="https://davidnorton.app/"
          target="_blank"
          rel="noreferrer"
        >
          © {new Date().getFullYear()} {author}
        </a>
        &nbsp;| All Rights Reserved
        <div className="flex mt-1 mb-2 ml-3">
          <a
            href="https://www.facebook.com/minitothemax"
            target={'_blank'}
            rel="noreferrer"
          >
            <Facebook className="mx-1 fill-red-500 opacity-60 hover:opacity-100 w-7" />
          </a>
          <a
            href="https://www.instagram.com/minitothemax/"
            target={'_blank'}
            rel="noreferrer"
          >
            <Instagram className="mx-1 fill-red-500 opacity-60 hover:opacity-100 w-7" />
          </a>
          <a
            href="https://www.youtube.com/user/piemasters29"
            target={'_blank'}
            rel="noreferrer"
          >
            <Youtube className="mx-1 fill-red-500 opacity-60 hover:opacity-100 w-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
