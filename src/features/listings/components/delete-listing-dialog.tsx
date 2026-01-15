'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import type { Listing } from '../types'

interface DeleteListingDialogProps {
  listing: Listing | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (listing: Listing) => void
  isDeleting?: boolean
}

export function DeleteListingDialog({
  listing,
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}: DeleteListingDialogProps): React.ReactElement {
  if (!listing) return <></>

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Listing</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{listing.title}"? This will archive the listing and it
            will no longer be visible to users.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(listing)} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
