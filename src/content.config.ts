import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** A sample covering the risky cases. ALL_POSTS=1 loads every post instead. */
const SAMPLE = [
  'battle-reports/40k/grey-knights-vs-eldar', // images inside the post body
  'reviews/tools/instant-mold',
  'tutorials/general/bsl', // the most paints on one page
  'tutorials/40k/force-weapons',
  'updates/2014/space-wolves',
  'showcase/moonstone/grub',
  'showcase/space-wolves/wolf-guard', // uses <br>
  'showcase/space-wolves/logan-grimnar',
  'showcase/board-games/silver-tower/silver-tower-complete',
  'showcase/heroquest/core/barbarian', // unpublished
];

const posts = defineCollection({
  loader: glob({
    base: './content/blog',
    pattern: process.env.ALL_POSTS
      ? '**/index.mdx'
      : SAMPLE.map((folder) => `${folder}/index.mdx`),
    // The folder path, untouched, so URLs match the Gatsby site
    generateId: ({ entry }) => entry.replace(/\/index\.mdx$/, ''),
  }),
  schema: ({ image }) => {
    // Frontmatter names files without "./", which would resolve as a package
    const localImage = z.preprocess(
      (file) =>
        typeof file === 'string' && !file.startsWith('.') ? `./${file}` : file,
      image()
    );

    return z.object({
      title: z.string(),
      date: z
        .union([z.string(), z.date()])
        .transform((date) =>
          date instanceof Date ? date.toISOString().slice(0, 10) : date
        ),
      categories: z.array(z.string()),
      tags: z.array(z.string()),
      featuredImage: localImage,
      gallery: z.array(localImage).nullish(),
      published: z.boolean().default(false),
    });
  },
});

export const collections = { posts };
