import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { MapPin, Phone, Mail, Globe, Clock, Calendar, Star } from 'lucide-react'

export async function generateStaticParams() {
  const courses = await prisma.golfCourse.findMany({
    where: { isActive: true },
    select: { slug: true },
  })

  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const course = await prisma.golfCourse.findUnique({
    where: { slug: params.slug, isActive: true },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
      tracks: {
        where: { isActive: true },
        orderBy: { holes: 'asc' },
      },
      sessions: {
        where: {
          isAvailable: true,
          isCancelled: false,
          date: {
            gte: new Date(),
          },
        },
        orderBy: { date: 'asc' },
        take: 5,
      },
    },
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Images */}
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-6xl py-8">
          {/* Breadcrumb */}
          <div className="mb-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">Home</Link>
            {' / '}
            <Link href="/courses" className="hover:text-green-600">Courses</Link>
            {' / '}
            <span className="text-gray-900">{course.name}</span>
          </div>

          {/* Images Gallery */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {course.images.length > 0 ? (
              <>
                <div className="md:col-span-2 h-96 rounded-lg overflow-hidden">
                  <img
                    src={course.images[0].url}
                    alt={course.images[0].caption || course.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {course.images.slice(1, 5).map((image, idx) => (
                  <div key={image.id} className="h-48 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.caption || `${course.name} ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="md:col-span-2 h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-24 h-24 text-white opacity-50" />
              </div>
            )}
          </div>

          {/* Course Title and Info */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">
                {course.address}, {course.city}, {course.state} {course.zipCode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {course.description || 'Experience an amazing mini golf adventure at this location!'}
              </p>
            </div>

            {/* Tracks/Courses */}
            {course.tracks.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
                <div className="space-y-4">
                  {course.tracks.map((track) => (
                    <div
                      key={track.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{track.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          track.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : track.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {track.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{track.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {track.holes} Holes
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          ~{track.duration} min
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features & Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {course.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-700">Features</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {course.amenities.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-700">Amenities</h3>
                    <ul className="space-y-2">
                      {course.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {course.phone && (
                    <a
                      href={`tel:${course.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{course.phone}</span>
                    </a>
                  )}
                  {course.email && (
                    <a
                      href={`mailto:${course.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{course.email}</span>
                    </a>
                  )}
                  {course.website && (
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Location */}
              {course.googleMapsUrl && (
                <div>
                  <h3 className="font-bold text-lg mb-4">Location</h3>
                  <a
                    href={course.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-100 hover:bg-gray-200 transition p-4 rounded-lg text-center"
                  >
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <span className="text-sm font-medium">View on Google Maps</span>
                  </a>
                </div>
              )}

              {/* Book Now CTA */}
              <div>
                <Link
                  href={`/bookings?course=${course.id}`}
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Book This Course
                </Link>
              </div>

              {/* Upcoming Sessions */}
              {course.sessions.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4">Upcoming Sessions</h3>
                  <div className="space-y-2">
                    {course.sessions.slice(0, 3).map((session) => (
                      <div key={session.id} className="text-sm p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-gray-600 ml-6">
                          {new Date(session.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {' - '}
                          ${session.pricePerPerson}/person
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/bookings?course=${course.id}`}
                    className="block text-center text-green-600 hover:underline mt-3 text-sm font-medium"
                  >
                    View All Sessions →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
