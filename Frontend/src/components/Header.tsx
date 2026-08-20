import { Link } from 'raviger'
import React from 'react'

export default function Header() {
  return (
    <header className='bg-slate-300 h-15'>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex-shrink-0">
              <a href="#" className="text-xl font-bold text-gray-800">Shopping Cart</a>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
            </div>

            <div className="hidden md:flex">
              <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">Get Started</a>
            </div>
            
          </div>
        </div>
      </nav>

    </header>
  )
}
