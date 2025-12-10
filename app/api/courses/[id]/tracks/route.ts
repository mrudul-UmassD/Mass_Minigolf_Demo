import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses/[id]/tracks - Get tracks for a specific course
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tracks = await prisma.track.findMany({
      where: {
        courseId: params.id,
        isActive: true,
      },
      orderBy: { holes: 'asc' },
    })

    return NextResponse.json(tracks)
  } catch (error) {
    console.error('Error fetching tracks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tracks' },
      { status: 500 }
    )
  }
}
