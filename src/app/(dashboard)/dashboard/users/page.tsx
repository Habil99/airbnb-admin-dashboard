'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUsers, useUpdateUser } from '@features/users/hooks/use-users'
import { UsersTable } from '@features/users/components/users-table'
import { EditUserDialog } from '@features/users/components/edit-user-dialog'
import { Card, CardContent } from '@components/ui/card'
import { Pagination } from '@components/ui/pagination'
import type { User } from '@features/users/types/user'
import type { UpdateUserInput } from '@features/users/types/update-user-input'

export default function UsersPage(): React.ReactElement {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  // Fetch users with pagination
  const { data, isLoading, error } = useUsers({ page, limit })

  // Update user mutation
  const updateUserMutation = useUpdateUser()

  const handleEdit = (user: User): void => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleViewDetails = (user: User): void => {
    router.push(`/dashboard/users/${user.id}`)
  }

  const handleUpdateUser = async (data: UpdateUserInput): Promise<void> => {
    try {
      await updateUserMutation.mutateAsync(data)
      setIsEditDialogOpen(false)
      setSelectedUser(null)
    } catch (err) {
      console.error('Failed to update user:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Error loading users: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-2">
          Manage user accounts and permissions
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <UsersTable
            users={data?.users || []}
            onEdit={handleEdit}
            onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>

      {data?.pagination && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>
              Showing {data.users.length} of {data.pagination.total} users
            </p>
            <p>
              Page {data.pagination.page} of {data.pagination.totalPages}
            </p>
          </div>
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateUser}
        isSubmitting={updateUserMutation.isPending}
      />
    </div>
  )
}
