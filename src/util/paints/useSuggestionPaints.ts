import { useMemo } from 'react';
import { filterByCollection } from './collection';
import { getAllSortedPaints } from './getAllSortedPaints';
import { useCollection } from './useCollection';

/** The paints that suggestions may be picked from: all of them, or owned ones. */
export const useSuggestionPaints = (ownedOnly: boolean) => {
  const { collection } = useCollection();
  return useMemo(() => {
    const paints = getAllSortedPaints();
    return ownedOnly ? filterByCollection(paints, 'owned', collection) : paints;
  }, [ownedOnly, collection]);
};

/** What to say when nothing suits, naming the limits that were applied. */
export const noMatchesMessage = (allBrands: boolean, ownedOnly: boolean) =>
  `No close matches${ownedOnly ? ' among your paints' : ''}${
    allBrands ? '' : ' in this brand'
  }.`;
