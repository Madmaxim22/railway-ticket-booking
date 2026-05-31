type OpenToggleIconProps = { className?: string }

export default function OpenToggleIcon({ className }: OpenToggleIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="1" y="1" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
      <line x1="5.61523" y1="9.76929" x2="14.3845" y2="9.76929" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}
