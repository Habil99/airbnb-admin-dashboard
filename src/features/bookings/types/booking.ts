import type { BookingStatus } from './booking-status'
import type { BookingUser } from './booking-user'
import type { BookingListing } from './booking-listing'

export interface Booking {
  id: string
  checkIn: string
  checkOut: string
  totalPrice: number
  status: BookingStatus
  guestCount: number
  createdAt: string
  updatedAt: string
  user: BookingUser
  listing: BookingListing
}
