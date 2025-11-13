import { CitadelPaintCategory } from '../types';
import { textToId } from '../util/textToId';

export const getGloss = ({
  category,
  hex,
  gloss,
}: {
  category: CitadelPaintCategory;
  hex: string;
  gloss?: boolean;
}) => {
  if (gloss) {
    return (
      <path
        strokeWidth="0"
        transform="translate(3 -12), rotate(8), scale(.9 1)"
        d="M30.3838 0C37.0767 0 44.2617 1.40119 45.6397 3.50309C46.624 3.60317 59.0255 7.10626 60.1082 14.4127C60.1082 14.4127 65.5144 54.5929 67 68C42.9236 10.8991 24.078 71.1205 0 30.0167C0.790912 24.0011 1.61801 16.8579 1.84047 15.6138C2.62787 11.2099 7.74598 5.9052 15.9153 3.50309C18.3562 1.58139 23.6909 0 30.3838 0Z"
        fill={`url(#${textToId(category)}_gloss_gradient_${hex.substring(1, 7)})`}
      />
    );
  }
};
