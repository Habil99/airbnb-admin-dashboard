'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { ListingStatusBadge } from '@features/listings/components/listing-status-badge'
import { useListing } from '@features/listings/hooks/use-listings'
import Image from 'next/image'

interface ListingDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ListingDetailPage({ params }: ListingDetailPageProps): React.ReactElement {
  const router = useRouter()
  const { id } = use(params)
  const { data, isLoading, error } = useListing(id)

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading listing details...</p>
        </div>
      </div>
    )
  }

  if (error || !data?.listing) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Listing not found</p>
            <Button onClick={() => router.push('/dashboard/listings')}>Back to Listings</Button>
          </div>
        </div>
      </div>
    )
  }

  const { listing } = data

  return (
    <div className="p-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push('/dashboard/listings')}>
          ← Back to Listings
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Main Info Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{listing.title}</CardTitle>
                <p className="text-gray-600 mt-1">{listing.location}</p>
              </div>
              <ListingStatusBadge status={listing.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{listing.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Price per Night</p>
                <p className="text-lg font-semibold">${Number(listing.pricePerNight).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Max Guests</p>
                <p className="text-lg font-semibold">{listing.maxGuests}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bedrooms</p>
                <p className="text-lg font-semibold">{listing.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bathrooms</p>
                <p className="text-lg font-semibold">{listing.bathrooms}</p>
              </div>
            </div>

            {listing.imageUrl && (
              <div>
                <h3 className="font-semibold mb-2">Image</h3>
                <Image
                  width={500}
                  height={500}
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="rounded-lg max-w-md w-full object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Host</h3>
              <p className="text-gray-700">
                {listing.host?.name} ({listing.host?.email})
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings ({listing.bookings?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {listing.bookings && listing.bookings.length > 0 ? (
              <div className="space-y-3">
                {listing.bookings.map(booking => (
                  <div key={booking.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{booking.user.name}</p>
                        <p className="text-sm text-gray-600">{booking.user.email}</p>
                      </div>
                      <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bookings yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
