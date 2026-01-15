import { Badge } from '@components/ui/badge'
import type { UserRole } from '../types/user-role'

interface UserRoleBadgeProps {
  role: UserRole
}

export function UserRoleBadge({ role }: UserRoleBadgeProps): React.ReactElement {
  const variants: Record<
    UserRole,
    { variant: 'default' | 'secondary' | 'destructive'; label: string }
  > = {
    ADMIN: { variant: 'destructive', label: 'Admin' },
    USER: { variant: 'default', label: 'User' },
  }

  const { variant, label } = variants[role]

  return <Badge variant={variant}>{label}</Badge>
}
