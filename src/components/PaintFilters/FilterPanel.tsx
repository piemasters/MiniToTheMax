import type { CollectionFilter } from '../../util/paints/collection';
import type { ColorFilter } from '../../util/color/colorFilter';
import type { FacetCounts } from '../../util/filtering/paintResults';
import {
  FilterFields,
  type AllPaintFilters,
  type FilterField,
} from '../../util/filtering/togglePaints';
import type { HeadingLevel } from './CollapsibleFilter';
import { CollectionFilterGroup } from './CollectionFilterGroup';
import { ColorFilterGroup } from './ColorFilterGroup';
import { FilterGroup } from './FilterGroup';

export const FilterPanel = ({
  filters,
  colorFilter,
  counts,
  headingLevel,
  onToggle,
  onToggleAll,
  onColorChange,
  collectionFilter,
  collectionCounts,
  onCollectionChange,
}: {
  filters: AllPaintFilters;
  colorFilter: ColorFilter;
  counts: FacetCounts;
  headingLevel: HeadingLevel;
  onToggle: (type: FilterField, field: string) => void;
  onToggleAll: (type: FilterField) => void;
  onColorChange: (filter: ColorFilter) => void;
  collectionFilter: CollectionFilter;
  collectionCounts: { owned: number; wishlist: number };
  onCollectionChange: (filter: CollectionFilter) => void;
}) => (
  // A container, so the option grids respond to the panel's width rather than
  // the viewport's (the same panel is used in a sidebar and in a drawer)
  <div className="@container">
    <CollectionFilterGroup
      value={collectionFilter}
      counts={collectionCounts}
      headingLevel={headingLevel}
      onChange={onCollectionChange}
    />
    {FilterFields.map((field) => (
      <FilterGroup
        key={field}
        filters={filters[field]}
        counts={counts[field]}
        type={field}
        headingLevel={headingLevel}
        updateFilter={onToggle}
        toggleAll={() => onToggleAll(field)}
      />
    ))}
    <ColorFilterGroup
      filter={colorFilter}
      headingLevel={headingLevel}
      onChange={onColorChange}
    />
  </div>
);
