import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/sessions?trackId=... - Get available sessions for a track
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trackId = searchParams.get('trackId')

    if (!trackId) {
      return NextResponse.json(
        { error: 'trackId is required' },
        { status: 400 }
      )
    }

    const sessions = await prisma.session.findMany({
      where: {
        trackId,
        isAvailable: true,
        isCancelled: false,
        date: {
          gte: new Date(),
        },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}
