import type { UserRole } from './user-role'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  isBlocked: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    listings: number
    bookings: number
  }
}
