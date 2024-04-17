import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      {children}
    </section>
  )
}

export default Layout
