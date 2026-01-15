'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createListingSchema } from '@lib/validations'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'
import { Label } from '@components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import type { CreateListingInput, Listing } from '../types'

interface ListingFormProps {
  listing?: Listing
  onSubmit: (data: CreateListingInput) => void | Promise<void>
  onCancel: () => void
  isSubmitting?: boolean
}

export function ListingForm({
  listing,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ListingFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema),
    defaultValues: listing
      ? {
          title: listing.title,
          description: listing.description,
          location: listing.location,
          pricePerNight: Number(listing.pricePerNight),
          maxGuests: listing.maxGuests,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          imageUrl: listing.imageUrl || '',
          status: listing.status,
        }
      : {
          status: 'ACTIVE',
        },
  })

  const status = watch('status')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Beautiful Downtown Apartment"
            {...register('title')}
            disabled={isSubmitting}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your listing..."
            rows={4}
            {...register('description')}
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            {...register('location')}
            disabled={isSubmitting}
          />
          {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricePerNight">Price per Night ($) *</Label>
          <Input
            id="pricePerNight"
            type="number"
            step="0.01"
            placeholder="150.00"
            {...register('pricePerNight', { valueAsNumber: true })}
            disabled={isSubmitting}
          />
          {errors.pricePerNight && (
            <p className="text-sm text-red-500">{errors.pricePerNight.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxGuests">Max Guests *</Label>
          <Input
            id="maxGuests"
            type="number"
            placeholder="4"
            {...register('maxGuests', { valueAsNumber: true })}
            disabled={isSubmitting}
          />
          {errors.maxGuests && <p className="text-sm text-red-500">{errors.maxGuests.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms *</Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="2"
            {...register('bedrooms', { valueAsNumber: true })}
            disabled={isSubmitting}
          />
          {errors.bedrooms && <p className="text-sm text-red-500">{errors.bedrooms.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms *</Label>
          <Input
            id="bathrooms"
            type="number"
            placeholder="2"
            {...register('bathrooms', { valueAsNumber: true })}
            disabled={isSubmitting}
          />
          {errors.bathrooms && <p className="text-sm text-red-500">{errors.bathrooms.message}</p>}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="imageUrl">Image URL (optional)</Label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register('imageUrl')}
            disabled={isSubmitting}
          />
          {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={value => setValue('status', value as 'ACTIVE' | 'INACTIVE' | 'ARCHIVED')}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : listing ? 'Update Listing' : 'Create Listing'}
        </Button>
      </div>
    </form>
  )
}
