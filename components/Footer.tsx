import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <MapPin className="w-6 h-6 text-green-400" />
              MiniGolf MA
            </div>
            <p className="text-gray-400 text-sm">
              Your premier destination for mini golf experiences across Massachusetts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/courses" className="hover:text-green-400 transition">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-green-400 transition">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-green-400 transition">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@minigolfma.com" className="hover:text-green-400 transition">
                  contact@minigolfma.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-green-400 transition">
                  (XXX) XXX-XXXX
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>XXX Main Street<br />Boston, MA XXXXX</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MiniGolf Massachusetts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
