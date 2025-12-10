const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_ADMIN_PASSWORD || 'admin',
    10
  )

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
      password: hashedPassword,
    },
  })

  console.log('✅ Created admin user:', admin.username)

  // Seed sample golf courses
  const courses = [
    {
      name: "Pirate's Cove Adventure Golf",
      slug: 'pirates-cove',
      description: 'A pirate-themed mini golf adventure featuring waterfalls, caves, and lush tropical landscaping. Two 18-hole courses available for all skill levels.',
      address: '728 Main Street (Route 28)',
      city: 'South Yarmouth',
      state: 'Massachusetts',
      zipCode: '02664',
      phone: '(508) 394-6200',
      email: 'info@piratescove.net',
      website: 'https://piratescove.net',
      googleMapsUrl: 'https://maps.google.com/?q=Pirate\'s+Cove+South+Yarmouth+MA',
      latitude: 41.6688,
      longitude: -70.1972,
      features: ['18-Hole Courses', 'Pirate Theme', 'Waterfalls', 'Family Friendly', 'Group Rates'],
      amenities: ['Parking', 'Restrooms', 'Snack Bar', 'Gift Shop'],
      isActive: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800',
            caption: 'Main Course View',
            isPrimary: true,
            order: 1,
          },
        ],
      },
      tracks: {
        create: [
          {
            name: 'Blackbeard\'s Challenge',
            description: 'Our classic 18-hole adventure through pirate territory',
            holes: 18,
            difficulty: 'Medium',
            duration: 60,
            isActive: true,
          },
          {
            name: 'Captain Kidd\'s Adventure',
            description: 'A challenging course for experienced players',
            holes: 18,
            difficulty: 'Hard',
            duration: 75,
            isActive: true,
          },
        ],
      },
    },
    {
      name: 'Kimball Farm Mini Golf',
      slug: 'kimball-farm',
      description: 'A classic New England mini golf experience with challenging holes, ice cream stand, and farm animals nearby.',
      address: '400 Littleton Road',
      city: 'Westford',
      state: 'Massachusetts',
      zipCode: '01886',
      phone: '(978) 486-3891',
      email: 'info@kimballfarm.com',
      website: 'https://www.kimballfarm.com',
      googleMapsUrl: 'https://maps.google.com/?q=Kimball+Farm+Westford+MA',
      features: ['Classic Design', 'Ice Cream', 'Farm Animals', 'Family Owned'],
      amenities: ['Parking', 'Restrooms', 'Ice Cream Stand', 'Farm Store'],
      isActive: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1562184552-d8c473896983?w=800',
            caption: 'Course Overview',
            isPrimary: true,
            order: 1,
          },
        ],
      },
      tracks: {
        create: [
          {
            name: 'Classic Course',
            description: 'Traditional 18-hole mini golf experience',
            holes: 18,
            difficulty: 'Easy',
            duration: 45,
            isActive: true,
          },
        ],
      },
    },
  ]

  for (const course of courses) {
    const created = await prisma.golfCourse.create({
      data: course,
    })
    console.log('✅ Created golf course:', created.name)
  }

  // Seed website content
  const contentItems = [
    {
      key: 'hero_title',
      content: 'Experience MiniGolf in Massachusetts',
      contentType: 'text',
    },
    {
      key: 'hero_subtitle',
      content: 'Book your tee time at the best mini golf courses across the state',
      contentType: 'text',
    },
    {
      key: 'about_us',
      content: 'MiniGolf Massachusetts is your premier destination for booking mini golf experiences across the Commonwealth. We partner with the finest courses to bring you convenient online booking and the best rates.',
      contentType: 'text',
    },
    {
      key: 'contact_email',
      content: 'contact@minigolfma.com',
      contentType: 'text',
    },
    {
      key: 'contact_phone',
      content: '(XXX) XXX-XXXX',
      contentType: 'text',
    },
    {
      key: 'contact_address',
      content: 'XXX Main Street, Boston, MA XXXXX',
      contentType: 'text',
    },
  ]

  for (const item of contentItems) {
    await prisma.websiteContent.upsert({
      where: { key: item.key },
      update: { content: item.content },
      create: item,
    })
  }

  console.log('✅ Created website content')
  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
