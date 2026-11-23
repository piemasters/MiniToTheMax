import { getColorByBgColor } from '../util/getColorByBgColor';

export const getText = ({
  category,
  hex,
}: {
  category: string;
  hex: string;
}) => {
  if (category === 'IONIC Smart Colors') {
    return (
      <g transform="translate(14 42)">
        <text
          x="10"
          y="15"
          fontFamily="sans-serif"
          fontSize="12"
          fill={getColorByBgColor(hex)}
        >
          SC
        </text>
      </g>
    );
  } else {
    return null;
  }
};
