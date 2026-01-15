import { Badge } from '@components/ui/badge'
import type { ListingStatus } from '../types'

interface ListingStatusBadgeProps {
  status: ListingStatus
}

export function ListingStatusBadge({ status }: ListingStatusBadgeProps): React.ReactElement {
  const variants: Record<
    ListingStatus,
    { variant: 'default' | 'secondary' | 'destructive'; label: string }
  > = {
    ACTIVE: { variant: 'default', label: 'Active' },
    INACTIVE: { variant: 'secondary', label: 'Inactive' },
    ARCHIVED: { variant: 'destructive', label: 'Archived' },
  }

  const { variant, label } = variants[status]

  return <Badge variant={variant}>{label}</Badge>
}
