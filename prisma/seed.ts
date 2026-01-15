import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main(): Promise<void> {
  console.warn('🌱 Seeding database...')

  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.user.deleteMany()

  // Hash password for all users
  const passwordHash = await bcrypt.hash('password123', 10)

  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      passwordHash,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.warn('✅ Created admin user')

  // Create regular users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        passwordHash,
        name: 'John Doe',
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        passwordHash,
        name: 'Jane Smith',
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob.wilson@example.com',
        passwordHash,
        name: 'Bob Wilson',
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'alice.johnson@example.com',
        passwordHash,
        name: 'Alice Johnson',
        role: 'USER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie.brown@example.com',
        passwordHash,
        name: 'Charlie Brown',
        role: 'USER',
      },
    }),
  ])

  console.warn('✅ Created 5 regular users')

  // Create listings
  const listingsData = [
    {
      title: 'Modern Downtown Apartment',
      description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
      location: 'New York, NY',
      pricePerNight: 150,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    },
    {
      title: 'Cozy Beachfront Cottage',
      description: 'Charming cottage right on the beach. Wake up to ocean views every morning.',
      location: 'Malibu, CA',
      pricePerNight: 200,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
    },
    {
      title: 'Luxury Mountain Cabin',
      description: 'Spacious cabin with mountain views, perfect for a family getaway.',
      location: 'Aspen, CO',
      pricePerNight: 300,
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8',
    },
    {
      title: 'Historic Brownstone Loft',
      description: 'Unique loft space in a historic brownstone building.',
      location: 'Boston, MA',
      pricePerNight: 180,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    },
    {
      title: 'Contemporary Studio',
      description: 'Sleek studio apartment perfect for solo travelers or couples.',
      location: 'San Francisco, CA',
      pricePerNight: 120,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    },
    {
      title: 'Rustic Farmhouse',
      description: 'Peaceful farmhouse surrounded by nature. Great for a quiet retreat.',
      location: 'Portland, OR',
      pricePerNight: 140,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    },
    {
      title: 'Penthouse Suite',
      description: 'Luxurious penthouse with panoramic city views and premium amenities.',
      location: 'Miami, FL',
      pricePerNight: 400,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    },
    {
      title: 'Lakeside Retreat',
      description: 'Peaceful retreat on the lake with private dock and kayaks.',
      location: 'Lake Tahoe, CA',
      pricePerNight: 250,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 2,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
    },
    {
      title: 'Urban Loft Space',
      description: 'Industrial-chic loft in a converted warehouse.',
      location: 'Chicago, IL',
      pricePerNight: 160,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    },
    {
      title: 'Garden View Apartment',
      description: 'Ground floor apartment with access to beautiful private garden.',
      location: 'Seattle, WA',
      pricePerNight: 130,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      status: 'INACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    },
    {
      title: 'Desert Oasis Villa',
      description: 'Modern villa with pool in the desert landscape.',
      location: 'Phoenix, AZ',
      pricePerNight: 280,
      maxGuests: 7,
      bedrooms: 3,
      bathrooms: 3,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    },
    {
      title: 'Colonial Style Home',
      description: 'Classic colonial home with modern updates and large backyard.',
      location: 'Savannah, GA',
      pricePerNight: 170,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff',
    },
    {
      title: 'Treehouse Getaway',
      description: 'Unique treehouse experience in the forest canopy.',
      location: 'Asheville, NC',
      pricePerNight: 190,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e',
    },
    {
      title: 'Waterfront Condo',
      description: 'Modern condo with direct water access and boat slip.',
      location: 'Key West, FL',
      pricePerNight: 220,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      status: 'ARCHIVED' as const,
      imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80',
    },
    {
      title: 'Ski-In Ski-Out Chalet',
      description: 'Perfect location for ski enthusiasts, steps from the slopes.',
      location: 'Park City, UT',
      pricePerNight: 350,
      maxGuests: 10,
      bedrooms: 5,
      bathrooms: 4,
      status: 'ACTIVE' as const,
      imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf',
    },
  ]

  const listings = await Promise.all(
    listingsData.map((listing, index) =>
      prisma.listing.create({
        data: {
          ...listing,
          hostId: users[index % users.length].id,
        },
      })
    )
  )

  console.warn('✅ Created 15 listings')

  // Create bookings
  const now = new Date()
  const bookings = []

  for (let i = 0; i < 25; i++) {
    const listing = listings[i % listings.length]
    const user = users[i % users.length]
    const checkIn = new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    const checkOut = new Date(
      checkIn.getTime() + (3 + Math.floor(Math.random() * 7)) * 24 * 60 * 60 * 1000
    )
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (24 * 60 * 60 * 1000))
    const totalPrice = Number(listing.pricePerNight) * nights
    const guestCount = Math.floor(Math.random() * listing.maxGuests) + 1

    const statuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] as const
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    bookings.push(
      prisma.booking.create({
        data: {
          checkIn,
          checkOut,
          totalPrice,
          status,
          guestCount,
          userId: user.id,
          listingId: listing.id,
        },
      })
    )
  }

  await Promise.all(bookings)

  console.warn('✅ Created 25 bookings')
  console.warn('✅ Seeding complete!')
  console.warn('')
  console.warn('Login credentials:')
  console.warn('  Admin: admin@example.com / password123')
  console.warn('  User:  john.doe@example.com / password123')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
