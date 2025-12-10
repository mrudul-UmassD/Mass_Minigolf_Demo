'use client'

import { useEffect, useState } from 'react'
import { Users, MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react'

type Stats = {
  totalCourses: number
  totalBookings: number
  totalRevenue: number
  upcomingSessions: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCourses: 0,
    totalBookings: 0,
    totalRevenue: 0,
    upcomingSessions: 0,
  })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [coursesRes, bookingsRes, sessionsRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/bookings'),
        fetch('/api/sessions?upcoming=true'),
      ])

      const courses = await coursesRes.json()
      const bookings = await bookingsRes.json()
      const sessions = await sessionsRes.json()

      const totalRevenue = bookings.reduce(
        (sum: number, booking: any) => sum + booking.totalPrice,
        0
      )

      setStats({
        totalCourses: courses.length,
        totalBookings: bookings.length,
        totalRevenue,
        upcomingSessions: sessions.length,
      })

      // Get recent bookings
      setRecentBookings(bookings.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
    setLoading(false)
  }

  const statCards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: MapPin,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      title: 'Upcoming Sessions',
      value: stats.upcomingSessions,
      icon: Calendar,
      color: 'bg-purple-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  People
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">
                          {booking.customerEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {booking.session?.track?.course?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(booking.session?.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{booking.numberOfPeople}</td>
                    <td className="px-6 py-4 font-medium">
                      ${booking.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
