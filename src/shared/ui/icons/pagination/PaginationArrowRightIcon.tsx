type PaginationArrowRightIconProps = {
  className?: string
}

export default function PaginationArrowRightIcon({ className }: PaginationArrowRightIconProps) {
  return (
    <svg
      viewBox="0 0 17 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M10.6746 13.6362C7.19004 10.2308 3.8907 7.03047 0.637687 3.85955C-0.256115 2.9883 -0.18787 1.48294 0.701393 0.607056C1.56924 -0.247731 2.89131 -0.177635 3.75916 0.677152C7.94764 4.8026 12.1492 8.9409 16.2875 13.017C16.6852 13.4087 16.6853 14.05 16.2875 14.4416C12.3011 18.3656 8.14855 22.4346 4.01587 26.5206C3.11528 27.411 1.7423 27.4847 0.866345 26.5701C0.0121312 25.6781 -0.0408515 24.1841 0.836369 23.3148C3.93498 20.244 7.20128 17.0307 10.6746 13.6362Z"
        fill="currentColor"
      />
    </svg>
  )
}
