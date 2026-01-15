import type { BookingStatus } from './booking-status'

export interface BookingsFilterParams {
  page?: number
  limit?: number
  status?: BookingStatus
  userId?: string
  listingId?: string
}
