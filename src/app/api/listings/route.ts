import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@lib/prisma'
import { createListingSchema, listingFilterSchema } from '@lib/validations'

// GET /api/listings - Get all listings with filters
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
      hostId: searchParams.get('hostId'),
    }

    // Validate query parameters
    const validation = listingFilterSchema.safeParse(queryParams)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { page, limit, status, hostId } = validation.data
    const skip = (page - 1) * limit

    // Build where clause (filter out null/undefined values)
    const where: Record<string, unknown> = {}
    if (status) where.status = status
    if (hostId) where.hostId = hostId

    // Execute queries in parallel
    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limit,
        include: {
          host: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              bookings: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.listing.count({ where }),
    ])

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get listings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/listings - Create new listing
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()

    // Validate request body
    const validation = createListingSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }

    const data = validation.data

    // For this demo, we'll use the first user as the host
    // In production, this would come from the authenticated user
    const firstUser = await prisma.user.findFirst()
    if (!firstUser) {
      return NextResponse.json({ error: 'No users found' }, { status: 400 })
    }

    const listing = await prisma.listing.create({
      data: {
        ...data,
        hostId: firstUser.id,
        status: data.status || 'ACTIVE',
      },
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

    return NextResponse.json({ listing }, { status: 201 })
  } catch (error) {
    console.error('Create listing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
