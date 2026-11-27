import { categoryTitle, postsInCategory } from './categoryPosts';

const post = (id: string, ...categories: string[]) => ({
  id,
  data: { categories },
});

describe('categoryTitle', () => {
  test.each([
    ['orks', 'Orks'],
    ['board-games', 'Board Games'],
    ['star-wars-shatterpoint', 'Star Wars Shatterpoint'],
    ['40k', '40k'],
  ])('writes %s as %s', (folder, title) => {
    expect(categoryTitle(folder)).toBe(title);
  });
});

describe('postsInCategory', () => {
  const posts = [
    post('showcase/orks/untagged'),
    post('showcase/other-army/tagged', 'Showcase', 'Orks'),
    post('showcase/orks/both', 'Showcase', 'Orks'),
    post('showcase/orks-and-more/near', 'Showcase'),
    post('reviews/books/half', 'Orks'),
  ];

  test('lists posts in the folder or named by its categories, once each', () => {
    expect(
      postsInCategory(posts, 'showcase', 'orks').map(({ id }) => id)
    ).toEqual([
      'showcase/orks/untagged',
      'showcase/other-army/tagged',
      'showcase/orks/both',
    ]);
  });

  test('lists nothing for a folder with no posts', () => {
    expect(postsInCategory(posts, 'showcase', 'heroquest')).toEqual([]);
  });
});
