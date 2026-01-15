import { apiClient } from '@lib/api/client'
import type { BookingsFilterParams } from '../types/bookings-filter-params'
import type { BookingsResponse } from '../types/bookings-response'
import type { SingleBookingResponse } from '../types/single-booking-response'
import type { UpdateBookingStatusInput } from '../types/update-booking-status-input'
import type { UpdateBookingResponse } from '../types/update-booking-response'

export const bookingsApi = {
  async getAll(params?: BookingsFilterParams): Promise<BookingsResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.userId) queryParams.append('userId', params.userId)
    if (params?.listingId) queryParams.append('listingId', params.listingId)

    const response = await apiClient.get<BookingsResponse>(
      `/bookings?${queryParams.toString()}`
    )
    return response.data
  },

  async getById(id: string): Promise<SingleBookingResponse> {
    const response = await apiClient.get<SingleBookingResponse>(`/bookings/${id}`)
    return response.data
  },

  async updateStatus(
    id: string,
    data: Omit<UpdateBookingStatusInput, 'id'>
  ): Promise<UpdateBookingResponse> {
    const response = await apiClient.patch<UpdateBookingResponse>(`/bookings/${id}`, data)
    return response.data
  },
}
