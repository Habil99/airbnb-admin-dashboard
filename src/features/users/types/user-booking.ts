export interface UserBooking {
  id: string
  checkIn: string
  checkOut: string
  status: string
  totalPrice: number
  listing: {
    title: string
    location: string
  }
}
