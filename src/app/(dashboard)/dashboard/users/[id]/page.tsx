'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@features/users/hooks/use-users'
import { UserRoleBadge } from '@features/users/components/user-role-badge'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'

interface UserDetailPageProps {
  params: Promise<{ id: string }>
}

export default function UserDetailPage({ params }: UserDetailPageProps): React.ReactElement {
  const router = useRouter()
  const { id } = use(params)
  const { data, isLoading, error } = useUser(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading user details...</p>
      </div>
    )
  }

  if (error || !data?.user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading user details</p>
      </div>
    )
  }

  const { user } = data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Details</h1>
        <Button variant="outline" onClick={() => router.push('/dashboard/users')}>
          Back to Users
        </Button>
      </div>

      {/* User Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <UserRoleBadge role={user.role} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              {user.isBlocked ? (
                <Badge variant="destructive">Blocked</Badge>
              ) : (
                <Badge variant="default">Active</Badge>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created At</p>
              <p className="text-base">{new Date(user.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Updated At</p>
              <p className="text-base">{new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Listings ({user.listings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {user.listings.length === 0 ? (
            <p className="text-gray-500">No listings found for this user.</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price/Night</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.listings.map(listing => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>{listing.location}</TableCell>
                      <TableCell>
                        <Badge>{listing.status}</Badge>
                      </TableCell>
                      <TableCell>${Number(listing.pricePerNight).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({user.bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {user.bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found for this user.</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.bookings.map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.listing.title}</TableCell>
                      <TableCell>{booking.listing.location}</TableCell>
                      <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge>{booking.status}</Badge>
                      </TableCell>
                      <TableCell>${Number(booking.totalPrice).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
