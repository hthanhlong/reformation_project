import Navbar from '@/components/shared/Navbar'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="p-16">{children}</div>
    </main>
  )
}

export default RootLayout
