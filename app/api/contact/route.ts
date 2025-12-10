import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/contact - Submit a contact form
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'New',
      },
    })

    // TODO: Send notification email to admin

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

// GET /api/contact - Get all contact submissions (admin only - add auth later)
export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    )
  }
}
