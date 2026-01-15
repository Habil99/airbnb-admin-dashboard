'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBookings, useUpdateBookingStatus } from '@features/bookings/hooks/use-bookings'
import { BookingsTable } from '@features/bookings/components/bookings-table'
import { UpdateBookingStatusDialog } from '@features/bookings/components/update-booking-status-dialog'
import { Card, CardContent } from '@components/ui/card'
import { Pagination } from '@components/ui/pagination'
import type { Booking } from '@features/bookings/types/booking'
import type { UpdateBookingStatusInput } from '@features/bookings/types/update-booking-status-input'

export default function BookingsPage(): React.ReactElement {
  const router = useRouter()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  // Fetch bookings with pagination
  const { data, isLoading, error } = useBookings({ page, limit })

  // Update booking status mutation
  const updateBookingStatusMutation = useUpdateBookingStatus()

  const handleUpdateStatus = (booking: Booking): void => {
    setSelectedBooking(booking)
    setIsUpdateStatusDialogOpen(true)
  }

  const handleViewDetails = (booking: Booking): void => {
    router.push(`/dashboard/bookings/${booking.id}`)
  }

  const handleUpdateBookingStatus = async (data: UpdateBookingStatusInput): Promise<void> => {
    try {
      await updateBookingStatusMutation.mutateAsync(data)
      setIsUpdateStatusDialogOpen(false)
      setSelectedBooking(null)
    } catch (err) {
      console.error('Failed to update booking status:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-2">Manage customer bookings and reservations</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-2">Manage customer bookings and reservations</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Error loading bookings: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground mt-2">Manage customer bookings and reservations</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <BookingsTable
            bookings={data?.bookings || []}
            onUpdateStatus={handleUpdateStatus}
            onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>

      {data?.pagination && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>
              Showing {data.bookings.length} of {data.pagination.total} bookings
            </p>
            <p>
              Page {data.pagination.page} of {data.pagination.totalPages}
            </p>
          </div>
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <UpdateBookingStatusDialog
        booking={selectedBooking}
        open={isUpdateStatusDialogOpen}
        onOpenChange={setIsUpdateStatusDialogOpen}
        onSubmit={handleUpdateBookingStatus}
        isSubmitting={updateBookingStatusMutation.isPending}
      />
    </div>
  )
}
