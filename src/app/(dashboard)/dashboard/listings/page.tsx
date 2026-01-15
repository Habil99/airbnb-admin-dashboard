'use client'

import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { Pagination } from '@components/ui/pagination'
import { DeleteListingDialog } from '@features/listings/components/delete-listing-dialog'
import { ListingForm } from '@features/listings/components/listing-form'
import { ListingsTable } from '@features/listings/components/listings-table'
import {
  useCreateListing,
  useDeleteListing,
  useListings,
  useUpdateListing,
} from '@features/listings/hooks/use-listings'
import type { CreateListingInput, Listing } from '@features/listings/types'
import { useState } from 'react'

export default function ListingsPage(): React.ReactElement {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  // Fetch listings with pagination
  const { data, isLoading, error } = useListings({ page, limit })

  // Mutations
  const createMutation = useCreateListing()
  const updateMutation = useUpdateListing()
  const deleteMutation = useDeleteListing()

  const handleCreate = async (input: CreateListingInput): Promise<void> => {
    await createMutation.mutateAsync(input)
    setIsCreateDialogOpen(false)
  }

  const handleEdit = (listing: Listing): void => {
    setSelectedListing(listing)
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (input: CreateListingInput): Promise<void> => {
    if (!selectedListing) return

    await updateMutation.mutateAsync({
      id: selectedListing.id,
      ...input,
    })

    setIsEditDialogOpen(false)
    setSelectedListing(null)
  }

  const handleDeleteClick = (listing: Listing): void => {
    setSelectedListing(listing)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async (listing: Listing): Promise<void> => {
    await deleteMutation.mutateAsync(listing.id)
    setIsDeleteDialogOpen(false)
    setSelectedListing(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
          <p className="text-muted-foreground mt-2">Manage property listings</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading listings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
          <p className="text-muted-foreground mt-2">Manage property listings</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Error loading listings. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
          <p className="text-muted-foreground mt-2">
            Manage property listings ({data?.pagination.total || 0} total)
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create Listing</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <ListingsTable
            listings={data?.listings || []}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {data?.pagination && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>
              Showing {data.listings.length} of {data.pagination.total} listings
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

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
          </DialogHeader>
          <ListingForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateDialogOpen(false)}
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
          </DialogHeader>
          {selectedListing && (
            <ListingForm
              listing={selectedListing}
              onSubmit={handleUpdate}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setSelectedListing(null)
              }}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <DeleteListingDialog
        listing={selectedListing}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  )
}
