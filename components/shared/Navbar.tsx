import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex h-[80px] w-full items-center justify-between bg-black px-16 text-white">
      <span>Logo</span>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/credits">Credits</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
