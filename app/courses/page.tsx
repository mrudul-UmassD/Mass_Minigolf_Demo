import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin, Clock, Calendar } from 'lucide-react'

export default async function CoursesPage() {
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
      _count: {
        select: { sessions: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mini Golf Courses</h1>
          <p className="text-xl text-green-50">
            Explore {courses.length} amazing mini golf courses across Massachusetts
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">No courses available at the moment.</p>
            <p className="text-gray-500">Check back soon for new courses!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Course Image */}
                <div className="relative h-56 bg-gradient-to-br from-green-400 to-green-600 overflow-hidden">
                  {course.images[0]?.url ? (
                    <img
                      src={course.images[0].url}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition">
                    {course.name}
                  </h2>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{course.city}, {course.state}</span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {course.description || 'Discover this amazing mini golf experience!'}
                  </p>

                  {/* Tracks */}
                  {course.tracks.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {course.tracks.map((track) => (
                        <span
                          key={track.id}
                          className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        >
                          {track.holes} Holes • {track.difficulty}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  {course.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {course.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {course.features.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{course.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold group-hover:underline">
                      View Details →
                    </span>
                    {course._count.sessions > 0 && (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {course._count.sessions} sessions
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-xl mb-6 text-green-50">
            Choose a course and book your tee time today!
          </p>
          <Link
            href="/bookings"
            className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
