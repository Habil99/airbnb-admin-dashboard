import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '../api/bookings-api'
import type { BookingsFilterParams } from '../types/bookings-filter-params'
import type { UpdateBookingStatusInput } from '../types/update-booking-status-input'

const BOOKINGS_QUERY_KEY = 'bookings'

// Hook to fetch all bookings
export function useBookings(params?: BookingsFilterParams) {
  return useQuery({
    queryKey: [
      BOOKINGS_QUERY_KEY,
      params?.page,
      params?.limit,
      params?.status,
      params?.userId,
      params?.listingId,
    ],
    queryFn: () => bookingsApi.getAll(params),
  })
}

// Hook to fetch single booking
export function useBooking(id: string) {
  return useQuery({
    queryKey: [BOOKINGS_QUERY_KEY, id],
    queryFn: () => bookingsApi.getById(id),
    enabled: !!id,
  })
}

// Hook to update booking status
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: UpdateBookingStatusInput) =>
      bookingsApi.updateStatus(id, { status }),
    onSuccess: (_, variables) => {
      // Invalidate specific booking and all bookings
      queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY, variables.id] })
      queryClient.invalidateQueries({ queryKey: [BOOKINGS_QUERY_KEY] })
    },
  })
}
