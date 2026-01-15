import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@lib/prisma'
import { updateBookingStatusSchema } from '@lib/validations'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/bookings/[id] - Get single booking
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = await params

    const booking = await prisma.booking.findUnique({
      where: { id },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        totalPrice: true,
        status: true,
        guestCount: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            pricePerNight: true,
            maxGuests: true,
            bedrooms: true,
            bathrooms: true,
            imageUrl: true,
            status: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Get booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/bookings/[id] - Update booking status
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate request body
    const validation = updateBookingStatusSchema.safeParse({ ...body, id })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { id: _, status } = validation.data

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!existingBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Business rule: Cannot change status of completed or cancelled bookings
    if (
      existingBooking.status === 'COMPLETED' ||
      existingBooking.status === 'CANCELLED'
    ) {
      return NextResponse.json(
        { error: 'Cannot update completed or cancelled bookings' },
        { status: 400 }
      )
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        totalPrice: true,
        status: true,
        guestCount: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
            location: true,
          },
        },
      },
    })

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Update booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
