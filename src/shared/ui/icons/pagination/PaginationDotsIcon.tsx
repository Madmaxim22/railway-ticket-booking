type PaginationDotsIconProps = {
  className?: string
}

export default function PaginationDotsIcon({ className }: PaginationDotsIconProps) {
  return (
    <svg
      viewBox="0 0 42 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <ellipse cx="4.45455" cy="4.5" rx="4.45455" ry="4.5" fill="currentColor" />
      <ellipse cx="20.5" cy="4.5" rx="4.45455" ry="4.5" fill="currentColor" />
      <ellipse cx="37.5455" cy="4.5" rx="4.45455" ry="4.5" fill="currentColor" />
    </svg>
  )
}
