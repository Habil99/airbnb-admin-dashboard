'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Button } from '@components/ui/button'
import { ListingStatusBadge } from './listing-status-badge'
import type { Listing } from '../types'

interface ListingsTableProps {
  listings: Listing[]
  onEdit: (listing: Listing) => void
  onDelete: (listing: Listing) => void
}

export function ListingsTable({
  listings,
  onEdit,
  onDelete,
}: ListingsTableProps): React.ReactElement {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No listings found. Create your first listing to get started.</p>
      </div>
    )
  }

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price/Night</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Bedrooms</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Host</TableHead>
            <TableHead>Bookings</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map(listing => (
            <TableRow key={listing.id}>
              <TableCell className="font-medium">{listing.title}</TableCell>
              <TableCell>{listing.location}</TableCell>
              <TableCell>${Number(listing.pricePerNight).toFixed(2)}</TableCell>
              <TableCell>{listing.maxGuests}</TableCell>
              <TableCell>{listing.bedrooms}</TableCell>
              <TableCell>
                <ListingStatusBadge status={listing.status} />
              </TableCell>
              <TableCell>{listing.host?.name || 'Unknown'}</TableCell>
              <TableCell>{listing._count?.bookings || 0}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(listing)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(listing)}
                  disabled={listing.status === 'ARCHIVED'}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}
