import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listingsApi } from '../api/listings-api'
import type { ListingsFilterParams, CreateListingInput, UpdateListingInput } from '../types'

const LISTINGS_QUERY_KEY = 'listings'

// Hook to fetch all listings
export function useListings(params?: ListingsFilterParams) {
  return useQuery({
    queryKey: [
      LISTINGS_QUERY_KEY,
      params?.page,
      params?.limit,
      params?.status,
      params?.hostId,
    ],
    queryFn: () => listingsApi.getAll(params),
  })
}

// Hook to fetch single listing
export function useListing(id: string) {
  return useQuery({
    queryKey: [LISTINGS_QUERY_KEY, id],
    queryFn: () => listingsApi.getById(id),
    enabled: !!id,
  })
}

// Hook to create listing
export function useCreateListing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateListingInput) => listingsApi.create(input),
    onSuccess: () => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: [LISTINGS_QUERY_KEY] })
    },
  })
}

// Hook to update listing
export function useUpdateListing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...input }: UpdateListingInput) => listingsApi.update(id, input),
    onSuccess: (_, variables) => {
      // Invalidate specific listing and all listings
      queryClient.invalidateQueries({ queryKey: [LISTINGS_QUERY_KEY, variables.id] })
      queryClient.invalidateQueries({ queryKey: [LISTINGS_QUERY_KEY] })
    },
  })
}

// Hook to delete listing
export function useDeleteListing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => listingsApi.delete(id),
    onSuccess: () => {
      // Invalidate all listings
      queryClient.invalidateQueries({ queryKey: [LISTINGS_QUERY_KEY] })
    },
  })
}
