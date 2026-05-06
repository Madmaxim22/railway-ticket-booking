type DropdownChevronIconProps = {
  className?: string
}

export function DropdownChevronIcon({ className }: DropdownChevronIconProps) {
  return (
    <svg
      width="12"
      height="5"
      viewBox="0 0 12 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path className="dropdown-field__chevron-path" d="M6 4.58333L0 0H11.5L6 4.58333Z" />
    </svg>
  )
}
