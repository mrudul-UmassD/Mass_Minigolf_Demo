'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MapPin } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
            <MapPin className="w-6 h-6" />
            MiniGolf MA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-green-600 transition">
              Courses
            </Link>
            <Link href="/bookings" className="text-gray-700 hover:text-green-600 transition">
              Book Now
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition">
              Contact
            </Link>
            <Link
              href="/admin"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="block text-gray-700 hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/bookings"
              className="block text-gray-700 hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
