'use client'
import { format, formatRelative } from 'date-fns'
type RelativeTimeProps = {
  date?: string | number | Date | null
} & React.HTMLAttributes<HTMLTimeElement>
function RelativeTime({ date, ...props }: RelativeTimeProps) {
  if (!date) return '--/--/--'
  const isPastAWeek = Date.now() - new Date(date).getTime() > 7 * 24 * 60 * 60 * 1000
  const formattedDate = isPastAWeek
    ? format(new Date(date), 'MMM d, yyyy')
    : formatRelative(new Date(date), new Date())
  return (
    <time dateTime={new Date(date).toISOString()} {...props}>
      {formattedDate}
    </time>
  )
}

export default RelativeTime
