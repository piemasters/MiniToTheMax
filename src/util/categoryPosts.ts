/** A folder name as a category is written: "board-games" is "Board Games". */
export const categoryTitle = (folder: string) =>
  folder
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/**
 * The posts listed on the page for a folder of posts, such as
 * /showcase/orks/: those inside the folder, and those elsewhere whose
 * categories name both parts of its address.
 */
export const postsInCategory = <
  Post extends { id: string; data: { categories: string[] } },
>(
  posts: readonly Post[],
  section: string,
  folder: string
) => {
  const names = [categoryTitle(section), categoryTitle(folder)];
  return posts.filter(
    ({ id, data }) =>
      id.startsWith(`${section}/${folder}/`) ||
      names.every((name) => data.categories.includes(name))
  );
};
