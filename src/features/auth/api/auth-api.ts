import { apiClient } from '@lib/api/client'
import type { LoginCredentials, LoginResponse, CurrentUserResponse } from '../types'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials)
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    const { data } = await apiClient.get<CurrentUserResponse>('/auth/me')
    return data
  },
}
