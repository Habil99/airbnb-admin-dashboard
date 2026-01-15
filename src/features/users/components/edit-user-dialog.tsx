'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema } from '@lib/validations'
import type { UpdateUserInput } from '@lib/validations'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import type { User } from '../types/user'

interface EditUserDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: UpdateUserInput) => void
  isSubmitting?: boolean
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditUserDialogProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        name: user.name,
        isBlocked: user.isBlocked,
      })
    }
  }, [user, reset])

  const handleFormSubmit = (data: UpdateUserInput): void => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} placeholder="Enter user name" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isBlocked"
              {...register('isBlocked')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="isBlocked" className="font-normal cursor-pointer">
              Block this user
            </Label>
          </div>
          {errors.isBlocked && <p className="text-sm text-red-500">{errors.isBlocked.message}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
