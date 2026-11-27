import sharp from 'sharp';

const made = new Map<string, Promise<string | undefined>>();

const create = async (file: string) => {
  const image = sharp(file);
  // It would show through the transparent parts of the finished image
  if ((await image.metadata()).hasAlpha) return undefined;
  const tiny = await image
    .autoOrient()
    .resize(20)
    .webp({ quality: 30 })
    .toBuffer();
  return `data:image/webp;base64,${tiny.toString('base64')}`;
};

/**
 * A few hundred bytes of an image, to show blurred behind it until it loads.
 */
export const placeholderOf = (
  source: ImageMetadata
): Promise<string | undefined> => {
  // Astro keeps the file's location out of sight on the images it imports
  const { fsPath } = source as ImageMetadata & { fsPath?: string };
  if (!fsPath) return Promise.resolve(undefined);

  let placeholder = made.get(fsPath);
  if (!placeholder) {
    placeholder = create(fsPath);
    made.set(fsPath, placeholder);
  }
  return placeholder;
};
