import React, { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 border-b border-white/10 py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-gray-400">Get exclusive deals, latest products, and shopping tips delivered to your inbox</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 flex-1 min-w-fit relative" onSubmit={handleNewsletterSignup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              required
            />
            <button 
              type="submit"
              className="px-7 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold whitespace-nowrap hover:from-red-500 hover:to-red-600 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg hover:shadow-red-600/30"
            >
              Subscribe
            </button>
            {subscribed && (
              <span className="absolute bottom-full right-0 mb-2 text-green-500 text-xs font-medium animate-pulse">
                ✓ Thank you for subscribing!
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-5 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: About */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">About ShopCart</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">About Us</a></li>
              <li><a href="#careers" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Careers</a></li>
              <li><a href="#press" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Press</a></li>
              <li><a href="#blog" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Blog</a></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Contact Us</a></li>
              <li><a href="#faq" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">FAQ</a></li>
              <li><a href="#shipping" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Shipping Info</a></li>
              <li><a href="#returns" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Returns & Exchanges</a></li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Policies</h4>
            <ul className="space-y-3">
              <li><a href="#privacy" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Terms of Service</a></li>
              <li><a href="#cookies" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Cookie Policy</a></li>
              <li><a href="#accessibility" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Accessibility</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#track" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Track Order</a></li>
              <li><a href="#gift-cards" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Gift Cards</a></li>
              <li><a href="#store-locator" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Store Locator</a></li>
              <li><a href="#mobile-app" className="text-gray-400 text-sm hover:text-red-500 transition-colors inline-block hover:pl-1">Mobile App</a></li>
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Follow Us</h4>
            <div className="flex gap-3 flex-wrap">
              <a href="#facebook" className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-red-600/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#twitter" className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-red-600/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 002.856-3.51 9.86 9.86 0 01-2.836.856 4.88 4.88 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.822 4.822 0 00-8.239 4.403 13.72 13.72 0 01-9.995-5.064 4.822 4.822 0 001.493 6.43 4.784 4.784 0 01-2.191-.616v.061a4.823 4.823 0 003.865 4.726 4.822 4.822 0 002.096.085 4.824 4.824 0 004.506 3.348 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#instagram" className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-red-600/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="currentColor"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#youtube" className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-gray-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-red-600/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Bottom Info */}
      <div className="bg-black/20 px-5 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="text-xs font-semibold text-white uppercase tracking-wide">We Accept:</span>
            <div className="flex gap-3 flex-wrap justify-center">
              <span className="px-3 py-2 bg-white/8 border border-white/15 rounded text-xs text-gray-400 hover:bg-red-600/10 hover:border-red-500 hover:text-red-500 transition-all">💳 Visa</span>
              <span className="px-3 py-2 bg-white/8 border border-white/15 rounded text-xs text-gray-400 hover:bg-red-600/10 hover:border-red-500 hover:text-red-500 transition-all">💳 Mastercard</span>
              <span className="px-3 py-2 bg-white/8 border border-white/15 rounded text-xs text-gray-400 hover:bg-red-600/10 hover:border-red-500 hover:text-red-500 transition-all">💳 PayPal</span>
              <span className="px-3 py-2 bg-white/8 border border-white/15 rounded text-xs text-gray-400 hover:bg-red-600/10 hover:border-red-500 hover:text-red-500 transition-all">🏦 Bank Transfer</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500">
              &copy; 2024 ShopCart. All rights reserved. | 
              <a href="#privacy" className="hover:text-red-500 transition-colors"> Privacy</a> | 
              <a href="#terms" className="hover:text-red-500 transition-colors"> Terms</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
