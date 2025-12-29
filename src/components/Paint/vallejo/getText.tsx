import { getColorByBgColor } from '../util/getColorByBgColor';

export const getText = ({
  category,
  hex,
}: {
  category: string;
  hex: string;
}) => {
  if (category === 'Vallejo Game Color') {
    return (
      <g transform="translate(14 42)">
        <text
          x="0"
          y="15"
          fontFamily="sans-serif"
          fontSize="12"
          fill={getColorByBgColor(hex)}
        >
          G
        </text>
      </g>
    );
  } else if (category === 'Vallejo Model Color') {
    return (
      <g transform="translate(14 42)">
        <text
          x="0"
          y="15"
          fontFamily="sans-serif"
          fontSize="12"
          fill={getColorByBgColor(hex)}
        >
          M
        </text>
      </g>
    );
  } else if (category === 'Vallejo Xpress Color') {
    return (
      <g transform="translate(14 42)">
        <text
          x="0"
          y="15"
          fontFamily="sans-serif"
          fontSize="12"
          fill={getColorByBgColor(hex)}
        >
          X
        </text>
      </g>
    );
  } else {
    return null;
  }
};
