import type { PaintDetails } from '../../types';
import { textToId } from '../textToId';

/** Unique key for a paint, e.g. `citadel_mephiston_red_citadel_base`. */
export const paintId = ({
  company,
  name,
  category,
}: Pick<PaintDetails, 'company' | 'name' | 'category'>) =>
  `${textToId(company)}_${textToId(name)}_${textToId(category)}`;
