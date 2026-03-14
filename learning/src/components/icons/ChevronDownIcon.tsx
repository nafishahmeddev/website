interface ChevronDownIconProps {
  color: string;
  className?: string;
}

export function ChevronDownIcon({ color, className }: ChevronDownIconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 6l4 4 4-4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
