import { ReactNode } from 'react';

export const Chip = ({
  label,
  ariaLabel,
  onRemove,
  prefix,
}: {
  label: string;
  ariaLabel: string;
  onRemove: () => void;
  prefix?: ReactNode;
}) => {
  return (
    <button
      type="button"
      data-chip=""
      onClick={onRemove}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs! bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200"
    >
      {prefix}
      {label}
      <span aria-hidden="true">✕</span>
    </button>
  );
};
