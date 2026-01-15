import type { User } from './user'
import type { UserListing } from './user-listing'
import type { UserBooking } from './user-booking'

export interface UserWithDetails extends Omit<User, '_count'> {
  listings: UserListing[]
  bookings: UserBooking[]
}
