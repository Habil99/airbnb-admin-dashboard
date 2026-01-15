import type { BookingStatus } from './booking-status'

export interface UpdateBookingStatusInput {
  id: string
  status: BookingStatus
}
