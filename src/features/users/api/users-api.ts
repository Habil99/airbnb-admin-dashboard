import { apiClient } from '@lib/api/client'
import type { UsersFilterParams } from '../types/users-filter-params'
import type { UsersResponse } from '../types/users-response'
import type { SingleUserResponse } from '../types/single-user-response'
import type { UpdateUserInput } from '../types/update-user-input'
import type { UpdateUserResponse } from '../types/update-user-response'

export const usersApi = {
  async getAll(params?: UsersFilterParams): Promise<UsersResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const response = await apiClient.get<UsersResponse>(
      `/users?${queryParams.toString()}`
    )
    return response.data
  },

  async getById(id: string): Promise<SingleUserResponse> {
    const response = await apiClient.get<SingleUserResponse>(`/users/${id}`)
    return response.data
  },

  async update(id: string, data: Omit<UpdateUserInput, 'id'>): Promise<UpdateUserResponse> {
    const response = await apiClient.patch<UpdateUserResponse>(`/users/${id}`, data)
    return response.data
  },
}
