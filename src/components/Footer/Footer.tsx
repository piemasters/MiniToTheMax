import { FC } from 'react';
import { Facebook, Instagram, Youtube } from './Icons';

export const Footer: FC<{
  author: string;
}> = ({ author }) => {
  return (
    <footer data-testid="footer" className="py-8 mt-12 bg-gray-100">
      <div className="flex items-center justify-between max-w-3xl px-4 mx-auto text-xs no-underline md:text-sm">
        <div className="flex items-center">
          <a
            className="py-2 text-blue-600 hover:text-blue-800"
            href="https://davidnorton.app/"
            target="_blank"
            rel="noreferrer"
          >
            © {new Date().getFullYear()} {author}
          </a>
          <span className="hidden sm:block">&nbsp;| All Rights Reserved</span>
        </div>

        <div className="flex mt-1 mb-2 ml-3">
          <a
            href="https://www.facebook.com/minitothemax"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="mx-1 fill-red-500 opacity-60 hover:opacity-100 w-7" />
          </a>
          <a
            href="https://www.instagram.com/minitothemax/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="mx-1 fill-red-500 opacity-60 hover:opacity-100 w-7" />
          </a>
          <a
            href="https://www.youtube.com/user/piemasters29"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <Youtube className="mx-1 fill-red-500 opacity-60 hover:opacity-100 w-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
