function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

/** Локальное время суток в формате «ЧЧ:ММ» (24 ч). */
export function formatDateLocalHHMM(date: Date): string {
  if (Number.isNaN(date.getTime())) return '—'
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

/** Unix timestamp в секундах → локальное «ЧЧ:ММ» (24 ч). */
export function formatUnixSecondsToHHMM(unixSeconds: number): string {
  if (!Number.isFinite(unixSeconds)) return '—'
  return formatDateLocalHHMM(new Date(unixSeconds * 1000))
}
