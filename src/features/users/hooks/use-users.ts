import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/users-api'
import type { UsersFilterParams } from '../types/users-filter-params'
import type { UpdateUserInput } from '../types/update-user-input'

const USERS_QUERY_KEY = 'users'

// Hook to fetch all users
export function useUsers(params?: UsersFilterParams) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, params?.page, params?.limit],
    queryFn: () => usersApi.getAll(params),
  })
}

// Hook to fetch single user
export function useUser(id: string) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  })
}

// Hook to update user
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...input }: UpdateUserInput) => usersApi.update(id!, input),
    onSuccess: (_, variables) => {
      // Invalidate specific user and all users
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY, variables.id] })
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
    },
  })
}
