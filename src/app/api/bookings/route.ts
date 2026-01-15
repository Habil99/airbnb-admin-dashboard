import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@lib/prisma'
import { bookingFilterSchema } from '@lib/validations'

// GET /api/bookings - Get all bookings with filters
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
      userId: searchParams.get('userId'),
      listingId: searchParams.get('listingId'),
    }

    // Validate query parameters
    const validation = bookingFilterSchema.safeParse(queryParams)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { page, limit, status, userId, listingId } = validation.data
    const skip = (page - 1) * limit

    // Build where clause (filter out null/undefined values)
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (userId) where.userId = userId
    if (listingId) where.listingId = listingId

    // Execute queries in parallel
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        skip,
        take: limit,
        where,
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
              pricePerNight: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
