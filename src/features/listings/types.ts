export type ListingStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'

export interface Host {
  id: string
  name: string
  email: string
}

export interface Listing {
  id: string
  title: string
  description: string
  location: string
  pricePerNight: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  status: ListingStatus
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  hostId: string
  host?: Host
  _count?: {
    bookings: number
  }
}

export interface ListingWithBookings extends Listing {
  bookings: Array<{
    id: string
    checkIn: string
    checkOut: string
    status: string
    user: {
      name: string
      email: string
    }
  }>
}

export interface CreateListingInput {
  title: string
  description: string
  location: string
  pricePerNight: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  imageUrl?: string
  status?: ListingStatus
}

export interface UpdateListingInput extends Partial<CreateListingInput> {
  id: string
}

export interface ListingsResponse {
  listings: Listing[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SingleListingResponse {
  listing: ListingWithBookings
}

export interface CreateListingResponse {
  listing: Listing
}

export interface UpdateListingResponse {
  listing: Listing
}

export interface DeleteListingResponse {
  success: boolean
}

export interface ListingsFilterParams {
  page?: number
  limit?: number
  status?: ListingStatus
  hostId?: string
}
