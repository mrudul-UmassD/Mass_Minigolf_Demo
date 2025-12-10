import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/courses - Get all active courses
export async function GET() {
  try {
    const courses = await prisma.golfCourse.findMany({
      where: { isActive: true },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        tracks: {
          where: { isActive: true },
        },
        _count: {
          select: {
            sessions: {
              where: {
                isAvailable: true,
                isCancelled: false,
                date: {
                  gte: new Date(),
                },
              },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}
