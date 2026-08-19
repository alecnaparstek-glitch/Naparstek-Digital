export const Monogram = ({ className = "", strokeWidth = 3.4, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="square"
    aria-hidden="true"
    {...props}
  >
    <path d="M13 52 V12" />
    <path d="M13 12 L45 52" />
    <path d="M51 52 V12" />
    <path d="M25 12 L51 44" opacity="0.35" strokeWidth={strokeWidth * 0.7} />
  </svg>
);
