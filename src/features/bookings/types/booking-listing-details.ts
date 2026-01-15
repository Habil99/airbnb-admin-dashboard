export interface BookingListingDetails {
  id: string
  title: string
  description: string
  location: string
  pricePerNight: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  imageUrl: string | null
  status: string
}
