import type { PaintGradient as PaintGradientStop } from '../../../types';

export type GradientSpec =
  | { kind: 'linear'; x1: string; y1: string; x2: string; y2: string }
  | { kind: 'radial'; gradientTransform: string };

/** Vertical, bottom to top. */
export const verticalGradient: GradientSpec = {
  kind: 'linear',
  x1: '0%',
  y1: '100%',
  x2: '0%',
  y2: '0%',
};

export const radialGradient = (gradientTransform: string): GradientSpec => ({
  kind: 'radial',
  gradientTransform,
});

const Stops = ({ stops }: { stops: PaintGradientStop[] }) =>
  stops.map((g) => (
    <stop
      offset={`${g.offset}%`}
      stopColor={g.color}
      stopOpacity={`${g.opacity ?? 1}`}
      key={g.offset}
    />
  ));

export const PaintGradient = ({
  id,
  spec,
  stops,
}: {
  id: string;
  spec: GradientSpec;
  stops: PaintGradientStop[];
}) => {
  if (spec.kind === 'linear') {
    const { x1, y1, x2, y2 } = spec;
    return (
      <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
        <Stops stops={stops} />
      </linearGradient>
    );
  }
  return (
    <radialGradient
      id={id}
      cx="0"
      cy="0"
      r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform={spec.gradientTransform}
    >
      <Stops stops={stops} />
    </radialGradient>
  );
};
