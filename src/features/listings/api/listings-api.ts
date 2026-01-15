import { apiClient } from '@lib/api/client'
import type {
  ListingsResponse,
  SingleListingResponse,
  CreateListingInput,
  CreateListingResponse,
  UpdateListingInput,
  UpdateListingResponse,
  DeleteListingResponse,
  ListingsFilterParams,
} from '../types'

export const listingsApi = {
  getAll: async (params?: ListingsFilterParams): Promise<ListingsResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.hostId) queryParams.append('hostId', params.hostId)

    const response = await apiClient.get<ListingsResponse>(
      `/listings?${queryParams.toString()}`
    )
    return response.data
  },

  getById: async (id: string): Promise<SingleListingResponse> => {
    const { data } = await apiClient.get<SingleListingResponse>(`/listings/${id}`)
    return data
  },

  create: async (input: CreateListingInput): Promise<CreateListingResponse> => {
    const { data } = await apiClient.post<CreateListingResponse>('/listings', input)
    return data
  },

  update: async (
    id: string,
    input: Partial<CreateListingInput>
  ): Promise<UpdateListingResponse> => {
    const { data } = await apiClient.patch<UpdateListingResponse>(`/listings/${id}`, input)
    return data
  },

  delete: async (id: string): Promise<DeleteListingResponse> => {
    const { data } = await apiClient.delete<DeleteListingResponse>(`/listings/${id}`)
    return data
  },
}
