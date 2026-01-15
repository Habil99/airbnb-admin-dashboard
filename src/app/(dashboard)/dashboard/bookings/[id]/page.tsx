'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useBooking } from '@features/bookings/hooks/use-bookings'
import { BookingStatusBadge } from '@features/bookings/components/booking-status-badge'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'

interface BookingDetailPageProps {
  params: Promise<{ id: string }>
}

export default function BookingDetailPage({ params }: BookingDetailPageProps): React.ReactElement {
  const router = useRouter()
  const { id } = use(params)
  const { data, isLoading, error } = useBooking(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    )
  }

  if (error || !data?.booking) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading booking details</p>
      </div>
    )
  }

  const { booking } = data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Booking Details</h1>
        <Button variant="outline" onClick={() => router.push('/dashboard/bookings')}>
          Back to Bookings
        </Button>
      </div>

      {/* Booking Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Booking ID</p>
              <p className="text-base font-mono">{booking.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <BookingStatusBadge status={booking.status} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Check In</p>
              <p className="text-base">{new Date(booking.checkIn).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Check Out</p>
              <p className="text-base">{new Date(booking.checkOut).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Guest Count</p>
              <p className="text-base">{booking.guestCount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Price</p>
              <p className="text-base font-semibold">${Number(booking.totalPrice).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created At</p>
              <p className="text-base">{new Date(booking.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Updated At</p>
              <p className="text-base">{new Date(booking.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base">{booking.user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{booking.user.email}</p>
            </div>
            {booking.user.role && (
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-base">{booking.user.role}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Listing Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Listing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Title</p>
              <p className="text-base font-medium">{booking.listing.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-base">{booking.listing.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Price per Night</p>
              <p className="text-base">${Number(booking.listing.pricePerNight).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-base">{booking.listing.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Max Guests</p>
              <p className="text-base">{booking.listing.maxGuests}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bedrooms</p>
              <p className="text-base">{booking.listing.bedrooms}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bathrooms</p>
              <p className="text-base">{booking.listing.bathrooms}</p>
            </div>
          </div>
          {booking.listing.description && (
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-base mt-1">{booking.listing.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
