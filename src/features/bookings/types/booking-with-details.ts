import type { BookingStatus } from './booking-status'
import type { BookingUser } from './booking-user'
import type { BookingListingDetails } from './booking-listing-details'

export interface BookingWithDetails {
  id: string
  checkIn: string
  checkOut: string
  totalPrice: number
  status: BookingStatus
  guestCount: number
  createdAt: string
  updatedAt: string
  user: BookingUser
  listing: BookingListingDetails
}
