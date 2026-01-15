import { z } from 'zod'

// ================== Auth Schemas ==================

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

// ================== Listing Schemas ==================

export const createListingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description is too long'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  pricePerNight: z.number().positive('Price must be greater than 0'),
  maxGuests: z.number().int().positive('Max guests must be at least 1'),
  bedrooms: z.number().int().positive('Bedrooms must be at least 1'),
  bathrooms: z.number().int().positive('Bathrooms must be at least 1'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
})

export const updateListingSchema = createListingSchema.partial().extend({
  id: z.string(),
})

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>

// ================== User Schemas ==================

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  isBlocked: z.boolean().optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>

// ================== Booking Schemas ==================

export const updateBookingStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
})

export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>

// ================== Query Parameter Schemas ==================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export type PaginationInput = z.infer<typeof paginationSchema>

export const listingFilterSchema = paginationSchema.extend({
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).nullish(),
  hostId: z.string().nullish(),
})

export type ListingFilterInput = z.infer<typeof listingFilterSchema>

export const bookingFilterSchema = paginationSchema.extend({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).nullish(),
  userId: z.string().nullish(),
  listingId: z.string().nullish(),
})

export type BookingFilterInput = z.infer<typeof bookingFilterSchema>
