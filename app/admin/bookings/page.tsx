'use client'

import { useEffect, useState } from 'react'
import { Search, Filter } from 'lucide-react'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
    setLoading(false)
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.session?.track?.course?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
        <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
        <p className="text-gray-600">View and manage all customer bookings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course & Track
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date & Time
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Booked On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || statusFilter !== 'All'
                      ? 'No bookings match your filters'
                      : 'No bookings yet'}
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                      {booking.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.customerEmail}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">
                          {booking.session?.track?.course?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.session?.track?.name || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div>
                        <div>
                          {booking.session?.date
                            ? new Date(booking.session.date).toLocaleDateString()
                            : 'N/A'}
                        </div>
                        <div className="text-gray-500">
                          {booking.session?.startTime
                            ? new Date(booking.session.startTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {booking.numberOfPeople}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      ${booking.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700'
                            : booking.status === 'Completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-2xl font-bold">{filteredBookings.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              $
              {filteredBookings
                .reduce((sum, b) => sum + b.totalPrice, 0)
                .toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total People</p>
            <p className="text-2xl font-bold">
              {filteredBookings.reduce((sum, b) => sum + b.numberOfPeople, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredBookings.filter((b) => b.status === 'Confirmed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
