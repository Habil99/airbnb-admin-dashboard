import { Badge } from '@components/ui/badge'
import type { BookingStatus } from '../types/booking-status'

interface BookingStatusBadgeProps {
  status: BookingStatus
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps): React.ReactElement {
  const variants: Record<
    BookingStatus,
    { variant: 'default' | 'secondary' | 'destructive'; label: string }
  > = {
    PENDING: { variant: 'secondary', label: 'Pending' },
    CONFIRMED: { variant: 'default', label: 'Confirmed' },
    CANCELLED: { variant: 'destructive', label: 'Cancelled' },
    COMPLETED: { variant: 'default', label: 'Completed' },
  }

  const { variant, label } = variants[status]

  return <Badge variant={variant}>{label}</Badge>
}
