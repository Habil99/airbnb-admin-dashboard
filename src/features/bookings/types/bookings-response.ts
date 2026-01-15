import type { Booking } from './booking'
import type { Pagination } from './pagination'

export interface BookingsResponse {
  bookings: Booking[]
  pagination: Pagination
}
