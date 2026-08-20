import { Link } from 'raviger'
import React from 'react'

export default function Header() {
  return (
    <header className='bg-slate-300 h-15'>
        <div className='text-[#000FFF] font-bold'>Shopping Cart</div>
        <nav className='flex ml-3 gap-6'>
    <Link href="/" className='text-sm font-medium text-black  hover:text-blue-500'>Home</Link>
    
    <Link href="/" className='text-sm font-medium text-black'>Login</Link>
        </nav>
    </header>
  )
}
