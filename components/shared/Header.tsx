import React from 'react'

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  )
}

export default Header
