'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { navLinks } from '../../constants'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex h-[80px] w-full items-center justify-between bg-black px-16 text-white">
      <ul className="flex gap-4">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`flex cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-gray-400 ${
              pathname === link.route ? 'bg-blue-400' : 'bg-transparent'
            }`}
          >
            <Image
              src={link.icon}
              alt={link.label}
              width={24}
              height={24}
              className="h-6 w-6 brightness-200"
            />
            <Link href={link.route}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <UserButton />
    </nav>
  )
}

export default Navbar
