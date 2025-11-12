export const getPages = ({
  currentPage,
  numPages,
  maxPages,
}: {
  currentPage: number;
  numPages: number;
  maxPages: number;
}) => {
  let startPage: number;
  let endPage: number;
  if (numPages <= maxPages) {
    // Show all pages
    startPage = 1;
    endPage = numPages;
  } else {
    if (currentPage <= Math.floor(maxPages / 2)) {
      // Left end [ 1 [2] 3 4 ] || [ 1 [2] 3 ]
      startPage = 1;
      endPage = maxPages;
    } else if (numPages - currentPage < Math.floor(maxPages / 2) + 1) {
      // Right end [ 7 [8] 9 10 ] || [ 8 [9] 10 ]
      startPage = numPages - maxPages + 1;
      endPage = numPages;
    } else {
      // Middle [ 4 5 [6] 7 8 ] || [ 4 [5] 6 7 ]
      const even = maxPages % 2 === 0;
      startPage = even
        ? currentPage - Math.floor(maxPages / 2) + 1
        : currentPage - Math.floor(maxPages / 2);
      endPage = even
        ? currentPage + Math.ceil(maxPages / 2)
        : currentPage + Math.ceil(maxPages / 2) - 1;
    }
  }

  // Return an array of pages to repeat
  return [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);
};
