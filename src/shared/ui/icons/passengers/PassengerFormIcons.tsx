type IconProps = {
  className?: string
}

export function AddPassengerIcon({ className }: IconProps) {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="add-passenger-btn__icon-path" d="M7.98836 1.50724L7.98836 7.98836L1.50724 7.98836C0.904343 7.98836 0.452171 8.44053 0.452171 9.04343C0.452171 9.64632 0.904343 10.0985 1.50724 10.0985L7.98836 10.0985L7.98836 16.5796C7.98836 17.1825 8.44053 17.6347 8.96807 17.5593L9.11879 17.5593C9.72169 17.5593 10.1739 17.1072 10.0985 16.5796L10.0985 10.0985L16.4289 10.0985C17.0318 10.0985 17.484 9.64632 17.484 9.04343C17.484 8.44053 17.0318 7.98836 16.4289 7.98836L10.0985 7.98836L10.0985 1.50724C10.0985 0.904343 9.64632 0.452171 9.11879 0.527533L8.96807 0.527533C8.36517 0.527533 7.913 0.979705 7.98836 1.50724Z" />
    </svg>
  )
}

export function ToggleOpenIcon({ className }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="15" strokeWidth="2" className="passenger-card__toggle-icon-circle--open" />
      <line x1="8" y1="16" x2="24" y2="16" strokeWidth="2" className="passenger-card__toggle-icon-line--open" />
    </svg>
  )
}

export function ToggleCloseIcon({ className }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="passenger-card__toggle-icon-path--close" d="M14.9444 8.46381L14.9444 14.9449L8.46329 14.9449C7.8604 14.9449 7.40823 15.3971 7.40823 16C7.40823 16.6029 7.8604 17.0551 8.46329 17.0551L14.9444 17.0551L14.9444 23.5362C14.9444 24.1391 15.3966 24.5913 15.9241 24.5159L16.0748 24.5159C16.6777 24.5159 17.1299 24.0637 17.0546 23.5362L17.0546 17.0551L23.385 17.0551C23.9878 17.0551 24.44 16.6029 24.44 16C24.44 15.3971 23.9878 14.9449 23.385 14.9449L17.0546 14.9449L17.0546 8.46381C17.0546 7.86091 16.6024 7.40874 16.0748 7.4841L15.9241 7.4841C15.3212 7.4841 14.8691 7.93628 14.9444 8.46381Z" />
      <circle cx="16" cy="16" r="15" strokeWidth="2" className="passenger-card__toggle-icon-circle--close" />
    </svg>
  )
}

export function RemovePassengerIcon({ className }: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="passenger-card__remove-icon-path" d="M10.3 0.3L6 4.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L4.6 6L0.3 10.3C-0.1 10.7 -0.1 11.3 0.3 11.6L0.4 11.7C0.8 12.1 1.4 12.1 1.7 11.7L6 7.4L10.2 11.6C10.6 12 11.2 12 11.6 11.6C12 11.2 12 10.6 11.6 10.2L7.4 6L11.7 1.7C12.1 1.3 12.1 0.7 11.7 0.4L11.6 0.3C11.2 -0.1 10.6 -0.1 10.3 0.3Z" />
    </svg>
  )
}

export function ErrorStatusIcon({ className }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="passenger-card__footer-icon-path--error" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM16 14.6L20.2998 10.3C20.5996 9.90002 21.2002 9.90002 21.5996 10.3L21.7002 10.4C22.0996 10.7 22.0996 11.3 21.7002 11.7L17.4004 16L21.5996 20.2C22 20.6 22 21.2 21.5996 21.6C21.3662 21.8337 21.0645 21.9309 20.7744 21.8915C20.5674 21.8634 20.3662 21.7662 20.2002 21.6L16 17.4L11.7002 21.7C11.4004 22.1 10.7998 22.1 10.4004 21.7L10.2998 21.6C9.90039 21.3 9.90039 20.7 10.2998 20.3L14.5996 16L10.2998 11.7C10.0811 11.4811 9.98242 11.2021 10.0029 10.929C10.0205 10.7031 10.1191 10.4811 10.2998 10.3C10.7002 9.90002 11.2998 9.90002 11.7002 10.3L16 14.6Z" />
    </svg>
  )
}

export function SuccessStatusIcon({ className }: IconProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path className="passenger-card__footer-icon-path--success" d="M16 32C24.8369 32 32 24.8365 32 16C32 7.16345 24.8369 0 16 0C7.16309 0 0 7.16345 0 16C0 24.8365 7.16309 32 16 32ZM10.2168 15.8293L10.207 15.8401C9.93262 16.1293 9.93262 16.6112 10.1973 16.9111C10.8311 17.5991 11.4551 18.2819 12.0703 18.9553C12.6914 19.6343 13.3037 20.3038 13.9092 20.9598C13.958 21.0134 14.0361 21.0134 14.085 20.9598L22.8018 11.4272C23.0664 11.1381 23.0664 10.6667 22.8018 10.3776L22.665 10.2169C22.4004 9.92773 21.959 9.92773 21.6953 10.2169L13.9189 18.7213C13.8799 18.7642 13.8311 18.7642 13.791 18.7213C12.9297 17.7681 12.0479 16.7933 11.1768 15.8401C10.9121 15.5509 10.4814 15.5509 10.2168 15.8293Z" />
    </svg>
  )
}
