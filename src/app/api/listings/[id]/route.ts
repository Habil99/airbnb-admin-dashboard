import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@lib/prisma'
import { updateListingSchema } from '@lib/validations'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/listings/[id] - Get single listing
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        bookings: {
          select: {
            id: true,
            checkIn: true,
            checkOut: true,
            status: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    })

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    return NextResponse.json({ listing })
  } catch (error) {
    console.error('Get listing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/listings/[id] - Update listing
export async function PATCH(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate request body
    const validation = updateListingSchema.safeParse({ ...body, id })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { id: _, ...data } = validation.data

    // Check if listing exists
    const existingListing = await prisma.listing.findUnique({
      where: { id },
    })

    if (!existingListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const listing = await prisma.listing.update({
      where: { id },
      data,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ listing })
  } catch (error) {
    console.error('Update listing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/listings/[id] - Delete listing (soft delete)
export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params

    // Check if listing exists
    const existingListing = await prisma.listing.findUnique({
      where: { id },
    })

    if (!existingListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // Soft delete by setting status to ARCHIVED
    await prisma.listing.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete listing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
