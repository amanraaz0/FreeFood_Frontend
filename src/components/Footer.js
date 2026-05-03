// src/components/Footer.js
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* grid: 1 col on small, 2 on sm, 4 on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/news" className="hover:text-white">
                  News & Stories
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Address */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Address</h3>
            <p className="text-sm text-gray-200">FreeFood Foundation</p>
            <p className="text-sm text-gray-200">
              Community Food Sharing Center
            </p>
            <p className="text-sm text-gray-200">Sector 4, Green Nagar</p>
            <p className="text-sm text-gray-200">New Delhi - 110001</p>
            <p className="text-sm text-gray-200">India</p>
          </div>

          {/* Contact Detail */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Detail</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <span>+91 7808874974</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">💬</span>
                <span>+91 7808874974 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">✉️</span>
                <span>freefoodconnect@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Events + Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>

            <ul className="space-y-2 text-sm text-gray-200 mb-4">
              <li>Food Drive — 15 Dec, 2025</li>
              <li>Community Feast — 20 Dec, 2025</li>
              <li>Donation Camp — 25 Dec, 2025</li>
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="bg-white text-green-900 p-2 rounded-full hover:scale-110 transition transform text-sm"
                aria-label="Website"
              >
                🌐
              </a>
              <a
                href="#"
                className="bg-white text-green-900 p-2 rounded-full hover:scale-110 transition transform text-sm"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="bg-white text-green-900 p-2 rounded-full hover:scale-110 transition transform text-sm"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="#"
                className="bg-white text-green-900 p-2 rounded-full hover:scale-110 transition transform text-sm"
                aria-label="YouTube"
              >
                ▶️
              </a>
              <a
                href="#"
                className="bg-white text-green-900 p-2 rounded-full hover:scale-110 transition transform text-sm"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-8 border-t border-green-800 pt-4 text-center">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} FreeFood — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
