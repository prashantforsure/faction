import React from 'react'

interface LogoProps {
  size?: number
  color?: string
}

export default function Logo({ size = 50, color = 'currentColor' }: LogoProps) {
  return (
    
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="4" />
        <path
          d="M30 50 C30 30, 70 30, 70 50 C70 70, 30 70, 30 50"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
        <circle cx="35" cy="40" r="5" fill={color} />
        <circle cx="65" cy="40" r="5" fill={color} />
        <path
          d="M40 65 Q50 75, 60 65"
          stroke={color}
          strokeWidth="4"
          fill="none"
        />
      </svg>
     
  )
}