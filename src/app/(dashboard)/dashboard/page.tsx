'use client'

import { useListings } from '@features/listings/hooks/use-listings'
import { useUsers } from '@features/users/hooks/use-users'
import { useBookings } from '@features/bookings/hooks/use-bookings'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Home, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'

export default function DashboardPage(): React.ReactElement {
  const { data: listingsData, isLoading: listingsLoading } = useListings({ page: 1, limit: 1 })
  const { data: usersData, isLoading: usersLoading } = useUsers({ page: 1, limit: 1 })
  const { data: bookingsData, isLoading: bookingsLoading } = useBookings({ page: 1, limit: 1 })

  const stats = [
    {
      title: 'Total Listings',
      value: listingsData?.pagination.total || 0,
      description: 'Active property listings',
      icon: Home,
      trend: '+12%',
    },
    {
      title: 'Total Users',
      value: usersData?.pagination.total || 0,
      description: 'Registered users',
      icon: Users,
      trend: '+8%',
    },
    {
      title: 'Total Bookings',
      value: bookingsData?.pagination.total || 0,
      description: 'All-time bookings',
      icon: Calendar,
      trend: '+23%',
    },
    {
      title: 'Revenue',
      value: `$${(
        (bookingsData?.bookings || []).reduce(
          (sum, booking) => sum + Number(booking.totalPrice),
          0
        ) || 0
      ).toLocaleString()}`,
      description: 'Total revenue',
      icon: DollarSign,
      trend: '+15%',
    },
  ]

  const isLoading = listingsLoading || usersLoading || bookingsLoading

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your Airbnb admin dashboard</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{stat.description}</span>
                    {stat.trend && (
                      <span className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System is running smoothly</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Use the sidebar navigation to manage listings, users, and bookings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
