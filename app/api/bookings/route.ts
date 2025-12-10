import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/bookings - Create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      sessionId,
      numberOfPeople,
      customerName,
      customerEmail,
      customerPhone,
      notes,
    } = body

    // Validate required fields
    if (!sessionId || !numberOfPeople || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if session exists and has available slots
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        track: true,
        bookings: {
          where: { status: { not: 'Cancelled' } },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    if (!session.isAvailable || session.isCancelled) {
      return NextResponse.json(
        { error: 'Session is not available' },
        { status: 400 }
      )
    }

    // Calculate booked slots
    const bookedSlots = session.bookings.reduce(
      (sum, booking) => sum + booking.numberOfPeople,
      0
    )

    if (bookedSlots + numberOfPeople > session.availableSlots) {
      return NextResponse.json(
        { error: 'Not enough available slots' },
        { status: 400 }
      )
    }

    // Calculate total price
    const totalPrice = session.pricePerPerson * numberOfPeople

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        sessionId,
        customerName,
        customerEmail,
        customerPhone,
        numberOfPeople,
        totalPrice,
        notes: notes || null,
        status: 'Confirmed',
      },
      include: {
        session: {
          include: {
            track: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    })

    // TODO: Send confirmation email

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

// GET /api/bookings - Get all bookings (admin only - add auth later)
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        session: {
          include: {
            track: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
