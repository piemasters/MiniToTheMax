import React, { FC } from 'react';

import { Facebook, Instagram, Youtube } from '../../data/icons';

export interface FooterProps {
  author: string;
}

export const Footer: FC<FooterProps> = ({ author }) => {
  return (
    <footer data-testid="footer" className="mt-12 bg-gray-100 py-8">
      <div className="flex items-center justify-end text-sm mx-auto max-w-3xl px-4 no-underline">
        <a
          className="text-blue-500 hover:text-blue-700"
          href="https://davidnorton.app/"
          target="_blank"
          rel="noreferrer"
        >
          © {new Date().getFullYear()} {author}
        </a>
        &nbsp;| All Rights Reserved
        <div className="mt-1 ml-3 flex mb-2">
          <a
            href="https://www.facebook.com/minitothemax"
            target={'_blank'}
            rel="noreferrer"
          >
            <Facebook className="fill-red-500 mx-1 opacity-60 hover:opacity-100 w-7" />
          </a>
          <a
            href="https://www.instagram.com/minitothemax/"
            target={'_blank'}
            rel="noreferrer"
          >
            <Instagram className="fill-red-500 mx-1 opacity-60 hover:opacity-100 w-7" />
          </a>
          <a
            href="https://www.youtube.com/user/piemasters29"
            target={'_blank'}
            rel="noreferrer"
          >
            <Youtube className="fill-red-500 mx-1 opacity-60 hover:opacity-100 w-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
