type PaginationArrowLeftIconProps = {
  className?: string
}

export default function PaginationArrowLeftIcon({ className }: PaginationArrowLeftIconProps) {
  return (
    <svg
      viewBox="0 0 17 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5.91132 13.6362C9.39583 10.2308 12.6952 7.03047 15.9482 3.85955C16.842 2.9883 16.7737 1.48294 15.8845 0.607056C15.0166 -0.247731 13.6946 -0.177635 12.8267 0.677152C8.63824 4.8026 4.43672 8.9409 0.298344 13.017C-0.0993557 13.4087 -0.0994549 14.05 0.298367 14.4416C4.2848 18.3656 8.43732 22.4346 12.57 26.5206C13.4706 27.411 14.8436 27.4847 15.7195 26.5701C16.5737 25.6781 16.6267 24.1841 15.7495 23.3148C12.6509 20.244 9.38459 17.0307 5.91132 13.6362Z"
        fill="currentColor"
      />
    </svg>
  )
}
