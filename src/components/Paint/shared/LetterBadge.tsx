import { getColorByBgColor } from '../util/getColorByBgColor';

/** Short text label (e.g. "G", "LM", "SC") drawn on the pot. */
export const LetterBadge = ({
  text,
  hex,
  x,
  y,
  fontSize = 12,
}: {
  text: string;
  hex: string;
  /** Horizontal centre of the text, in the shape path's coordinates. */
  x: number;
  /** Text baseline, in the shape path's coordinates. */
  y: number;
  /** In path units; brands drawn at a larger scale need a smaller size. */
  fontSize?: number;
}) => (
  <text
    x={`${x}`}
    y={`${y}`}
    textAnchor="middle"
    fontFamily="sans-serif"
    fontSize={`${fontSize}`}
    fill={getColorByBgColor(hex)}
  >
    {text}
  </text>
);
