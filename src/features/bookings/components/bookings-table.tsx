'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Button } from '@components/ui/button'
import { BookingStatusBadge } from './booking-status-badge'
import type { Booking } from '../types/booking'

interface BookingsTableProps {
  bookings: Booking[]
  onUpdateStatus: (booking: Booking) => void
  onViewDetails: (booking: Booking) => void
}

export function BookingsTable({
  bookings,
  onUpdateStatus,
  onViewDetails,
}: BookingsTableProps): React.ReactElement {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No bookings found.</p>
      </div>
    )
  }

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Listing</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-sm text-muted-foreground">{booking.user.email}</p>
                </div>
              </TableCell>
              <TableCell className="font-medium">{booking.listing.title}</TableCell>
              <TableCell>{booking.listing.location}</TableCell>
              <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
              <TableCell>{booking.guestCount}</TableCell>
              <TableCell>
                <BookingStatusBadge status={booking.status} />
              </TableCell>
              <TableCell>${Number(booking.totalPrice).toFixed(2)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(booking)}
                  disabled={booking.status === 'COMPLETED' || booking.status === 'CANCELLED'}
                >
                  Update Status
                </Button>
                <Button variant="secondary" size="sm" onClick={() => onViewDetails(booking)}>
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
