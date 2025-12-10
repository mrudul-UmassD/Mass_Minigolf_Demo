'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import {
  LayoutDashboard,
  MapPin,
  Route,
  Calendar,
  BookOpen,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin') {
      router.push('/admin')
    }
  }, [status, pathname, router])

  // Don't show sidebar on login page
  if (pathname === '/admin') {
    return <>{children}</>
  }

  const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/courses', icon: MapPin, label: 'Courses' },
    { href: '/admin/tracks', icon: Route, label: 'Tracks' },
    { href: '/admin/sessions', icon: Calendar, label: 'Sessions' },
    { href: '/admin/bookings', icon: BookOpen, label: 'Bookings' },
    { href: '/admin/contact', icon: Mail, label: 'Contact Submissions' },
    { href: '/admin/content', icon: FileText, label: 'Website Content' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-1">
            {session?.user?.name || 'Administrator'}
          </p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={() => signOut({ callbackUrl: '/admin' })}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 p-8">{children}</main>
    </div>
  )
}
