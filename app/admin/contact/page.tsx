'use client'

import { useEffect, useState } from 'react'
import { Mail, Search } from 'lucide-react'

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setSubmissions(data)
    } catch (error) {
      console.error('Error fetching contact submissions:', error)
    }
    setLoading(false)
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || submission.status === statusFilter

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
        <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
        <p className="text-gray-600">View and manage contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Read">Read</option>
              <option value="Responded">Responded</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            {searchTerm || statusFilter !== 'All'
              ? 'No submissions match your filters'
              : 'No contact submissions yet'}
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{submission.name}</h3>
                    <p className="text-gray-600">{submission.email}</p>
                    {submission.phone && (
                      <p className="text-sm text-gray-500">{submission.phone}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      submission.status === 'New'
                        ? 'bg-blue-100 text-blue-700'
                        : submission.status === 'Read'
                        ? 'bg-yellow-100 text-yellow-700'
                        : submission.status === 'Responded'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {submission.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Subject:</p>
                <p className="font-medium">{submission.subject}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Message:</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {submission.message}
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={`mailto:${submission.email}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
            <p className="text-2xl font-bold">{filteredSubmissions.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">New</p>
            <p className="text-2xl font-bold text-blue-600">
              {filteredSubmissions.filter((s) => s.status === 'New').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Responded</p>
            <p className="text-2xl font-bold text-purple-600">
              {filteredSubmissions.filter((s) => s.status === 'Responded').length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Resolved</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredSubmissions.filter((s) => s.status === 'Resolved').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
