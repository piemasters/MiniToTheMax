// Shrinks oversized images in the posts, in place. Run it with `yarn optimize`.
const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs-extra');

const MAX_WIDTH = 1800;
const QUALITY = 85;

const optimize = async (file) => {
  // Read first, so that the file is free to be written over
  const input = await fs.readFile(file);
  // Turned the way the camera held it, which resizing would otherwise lose
  const image = sharp(input).autoOrient();
  const { format, autoOrient } = await sharp(input).metadata();
  if (autoOrient.width <= MAX_WIDTH) return;

  image.resize(MAX_WIDTH);
  // Each image stays in its own format, so PNGs keep their transparency
  const output =
    format === 'jpeg' ? image.jpeg({ quality: QUALITY }) : image.png();
  await fs.writeFile(file, await output.toBuffer());
  console.log(`Resized ${file}`);
};

const main = async () => {
  // One at a time, so a large batch doesn't run out of memory
  for (const file of glob.sync('content/blog/**/*.{png,jpg,jpeg}')) {
    await optimize(file);
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
