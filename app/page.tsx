import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin, Calendar, Star } from 'lucide-react'

export default async function Home() {
  // Fetch website content
  const heroTitle = await prisma.websiteContent.findUnique({
    where: { key: 'hero_title' },
  })
  const heroSubtitle = await prisma.websiteContent.findUnique({
    where: { key: 'hero_subtitle' },
  })

  // Fetch featured courses
  const courses = await prisma.golfCourse.findMany({
    where: { isActive: true },
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      tracks: {
        where: { isActive: true },
      },
    },
    take: 6,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {heroTitle?.content || 'Experience MiniGolf in Massachusetts'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              {heroSubtitle?.content || 'Book your tee time at the best mini golf courses across the state'}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/courses"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Browse Courses
              </Link>
              <Link
                href="/bookings"
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition border-2 border-white"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book your tee time online in seconds. No phone calls needed.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Locations</h3>
              <p className="text-gray-600">Find courses across Massachusetts, from Cape Cod to Boston.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
              <p className="text-gray-600">Get the best prices and exclusive online-only deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-48 bg-gray-200">
                  {course.images[0]?.url && (
                    <img
                      src={course.images[0].url}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {course.city}, {course.state}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {course.tracks.map((track) => (
                      <span
                        key={track.id}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                      >
                        {track.holes} Holes
                      </span>
                    ))}
                  </div>
                  <span className="text-green-600 font-semibold">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-xl mb-8 text-green-50">
            Book your tee time today and experience the best mini golf in Massachusetts
          </p>
          <Link
            href="/bookings"
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition inline-block"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  )
}
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
