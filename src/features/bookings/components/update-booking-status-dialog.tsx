'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateBookingStatusSchema } from '@lib/validations'
import type { UpdateBookingStatusInput } from '@lib/validations'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Label } from '@components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import type { Booking } from '../types/booking'

interface UpdateBookingStatusDialogProps {
  booking: Booking | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: UpdateBookingStatusInput) => void
  isSubmitting?: boolean
}

export function UpdateBookingStatusDialog({
  booking,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: UpdateBookingStatusDialogProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateBookingStatusInput>({
    resolver: zodResolver(updateBookingStatusSchema),
  })

  const statusValue = watch('status')

  useEffect(() => {
    if (booking) {
      reset({
        id: booking.id,
        status: booking.status,
      })
    }
  }, [booking, reset])

  const handleFormSubmit = (data: UpdateBookingStatusInput): void => {
    onSubmit(data)
  }

  const statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'CANCELLED', label: 'Cancelled' },
    { value: 'COMPLETED', label: 'Completed' },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Booking Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {booking && (
            <div className="space-y-2 p-4 bg-gray-50 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Guest:</span> {booking.user.name}
              </p>
              <p className="text-sm">
                <span className="font-medium">Listing:</span> {booking.listing.title}
              </p>
              <p className="text-sm">
                <span className="font-medium">Check In:</span>{' '}
                {new Date(booking.checkIn).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Check Out:</span>{' '}
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={statusValue}
              onValueChange={value => setValue('status', value as UpdateBookingStatusInput['status'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
