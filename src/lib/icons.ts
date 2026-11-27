import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

// Relative to the project root, where the commands are run
const source = readFileSync(resolve('src/assets/images/icon.png'));

/** The sizes offered to devices. */
export const iconSizes = [48, 72, 96, 144, 192, 256, 384, 512];

/** Changes with the source image, so browsers fetch a new icon. */
const version = createHash('md5').update(source).digest('hex');

export const faviconUrl = `/favicon-32x32.png?v=${version}`;
export const iconUrl = (size: number) =>
  `/icons/icon-${size}x${size}.png?v=${version}`;

export const iconResponse = async (size: number) => {
  const png = await sharp(source)
    .resize(size, size, { fit: 'contain', background: '#00000000' })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
