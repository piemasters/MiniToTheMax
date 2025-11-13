export const removeCategoryName = (title: string) => {
  if (title.startsWith('Battle Report:')) {
    return title.slice(15);
  } else if (title.startsWith('Review:')) {
    return title.slice(8);
  } else if (title.startsWith('Showcase:')) {
    return title.slice(10);
  } else if (title.startsWith('Tutorial:')) {
    return title.slice(10);
  } else if (title.startsWith('Review & Tutorial:')) {
    return title.slice(19);
  } else {
    return title;
  }
};
