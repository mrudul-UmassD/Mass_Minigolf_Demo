'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, Clock, Users, DollarSign, CheckCircle } from 'lucide-react'

type GolfCourse = {
  id: string
  name: string
  city: string
  state: string
}

type Track = {
  id: string
  name: string
  holes: number
  difficulty: string
  duration: number
}

type Session = {
  id: string
  date: string
  startTime: string
  endTime: string
  availableSlots: number
  pricePerPerson: number
  trackId: string
}

export default function BookingsPage() {
  const searchParams = useSearchParams()
  const preselectedCourseId = searchParams.get('course')

  const [step, setStep] = useState(1)
  const [courses, setCourses] = useState<GolfCourse[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const [formData, setFormData] = useState({
    courseId: preselectedCourseId || '',
    trackId: '',
    sessionId: '',
    numberOfPeople: 1,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  })

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses()
  }, [])

  // Fetch tracks when course is selected
  useEffect(() => {
    if (formData.courseId) {
      fetchTracks(formData.courseId)
    }
  }, [formData.courseId])

  // Fetch sessions when track is selected
  useEffect(() => {
    if (formData.trackId) {
      fetchSessions(formData.trackId)
    }
  }, [formData.trackId])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/courses')
      const data = await res.json()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
    setLoading(false)
  }

  const fetchTracks = async (courseId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/courses/${courseId}/tracks`)
      const data = await res.json()
      setTracks(data)
    } catch (error) {
      console.error('Error fetching tracks:', error)
    }
    setLoading(false)
  }

  const fetchSessions = async (trackId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/sessions?trackId=${trackId}`)
      const data = await res.json()
      setSessions(data)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setBookingComplete(true)
      } else {
        alert('Failed to create booking. Please try again.')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('An error occurred. Please try again.')
    }
    setLoading(false)
  }

  const selectedCourse = courses.find((c) => c.id === formData.courseId)
  const selectedTrack = tracks.find((t) => t.id === formData.trackId)
  const selectedSession = sessions.find((s) => s.id === formData.sessionId)
  const totalPrice = selectedSession
    ? selectedSession.pricePerPerson * formData.numberOfPeople
    : 0

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your reservation has been successfully created. You will receive a confirmation email at{' '}
            <strong>{formData.customerEmail}</strong>.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Course:</strong> {selectedCourse?.name}</p>
              <p><strong>Track:</strong> {selectedTrack?.name}</p>
              <p><strong>Date:</strong> {selectedSession && new Date(selectedSession.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedSession && new Date(selectedSession.startTime).toLocaleTimeString()}</p>
              <p><strong>People:</strong> {formData.numberOfPeople}</p>
              <p><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <a
            href="/"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Your Mini Golf Session</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= num
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > num ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-green-600 font-medium' : 'text-gray-500'}>
              Select Course
            </span>
            <span className={step >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}>
              Choose Track
            </span>
            <span className={step >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}>
              Pick Session
            </span>
            <span className={step >= 4 ? 'text-green-600 font-medium' : 'text-gray-500'}>
              Your Details
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Step 1: Select Course */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Select a Golf Course</h2>
              {loading ? (
                <p>Loading courses...</p>
              ) : (
                <div className="space-y-3">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className={`block border-2 rounded-lg p-4 cursor-pointer transition ${
                        formData.courseId === course.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="courseId"
                        value={course.id}
                        checked={formData.courseId === course.id}
                        onChange={(e) =>
                          setFormData({ ...formData, courseId: e.target.value, trackId: '', sessionId: '' })
                        }
                        className="mr-3"
                      />
                      <span className="font-semibold">{course.name}</span>
                      <span className="text-gray-500 ml-2">
                        • {course.city}, {course.state}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.courseId}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Next: Choose Track
              </button>
            </div>
          )}

          {/* Step 2: Select Track */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Choose Your Track</h2>
              {loading ? (
                <p>Loading tracks...</p>
              ) : (
                <div className="space-y-3">
                  {tracks.map((track) => (
                    <label
                      key={track.id}
                      className={`block border-2 rounded-lg p-4 cursor-pointer transition ${
                        formData.trackId === track.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="trackId"
                        value={track.id}
                        checked={formData.trackId === track.id}
                        onChange={(e) =>
                          setFormData({ ...formData, trackId: e.target.value, sessionId: '' })
                        }
                        className="mr-3"
                      />
                      <div>
                        <span className="font-semibold">{track.name}</span>
                        <div className="flex gap-4 text-sm text-gray-600 mt-1">
                          <span>{track.holes} Holes</span>
                          <span>Difficulty: {track.difficulty}</span>
                          <span>~{track.duration} min</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.trackId}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Next: Pick Session
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Session */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Pick a Time Slot</h2>
              {loading ? (
                <p>Loading sessions...</p>
              ) : sessions.length === 0 ? (
                <p className="text-gray-600">No available sessions for this track at the moment.</p>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <label
                      key={session.id}
                      className={`block border-2 rounded-lg p-4 cursor-pointer transition ${
                        formData.sessionId === session.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sessionId"
                        value={session.id}
                        checked={formData.sessionId === session.id}
                        onChange={(e) =>
                          setFormData({ ...formData, sessionId: e.target.value })
                        }
                        className="mr-3"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold">
                              {new Date(session.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">
                              {new Date(session.startTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {' - '}
                              {new Date(session.endTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            ${session.pricePerPerson}/person
                          </div>
                          <div className="text-sm text-gray-500">
                            {session.availableSlots} slots left
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  disabled={!formData.sessionId}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Next: Your Details
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Customer Details */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Complete Your Booking</h2>

              {/* Booking Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Course:</strong> {selectedCourse?.name}</p>
                  <p><strong>Track:</strong> {selectedTrack?.name}</p>
                  <p>
                    <strong>Date:</strong>{' '}
                    {selectedSession &&
                      new Date(selectedSession.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </p>
                  <p>
                    <strong>Time:</strong>{' '}
                    {selectedSession &&
                      new Date(selectedSession.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                  </p>
                </div>
              </div>

              {/* Number of People */}
              <div>
                <label className="block font-semibold mb-2">
                  <Users className="inline w-4 h-4 mr-2" />
                  Number of People *
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedSession?.availableSlots || 10}
                  value={formData.numberOfPeople}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <label className="block font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, customerPhone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Creating Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
