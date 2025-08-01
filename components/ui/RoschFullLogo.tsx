import React from 'react';

interface RoschFullLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function RoschFullLogo({ className = '', width = 200, height = 60 }: RoschFullLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="roschGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      
      {/* ROSCH text */}
      <text x="10" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="currentColor">
        ROSCH
      </text>
      
      {/* INNOVATIONS text */}
      <text x="85" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="300" fill="currentColor">
        INNOVATIONS
      </text>
      
      {/* S-shaped icon */}
      <g transform="translate(220, 20)">
        {/* Main S shape */}
        <path
          d="M25 10 C35 10, 35 20, 25 30 C15 40, 5 40, 0 40 C-5 40, -5 50, 0 50 C5 50, 15 50, 25 50 C35 50, 35 60, 25 70"
          stroke="url(#roschGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Upper dot */}
        <circle cx="15" cy="25" r="2" fill="#60A5FA" />
        
        {/* Lower dot */}
        <circle cx="15" cy="55" r="2" fill="#34D399" />
      </g>
      
      {/* Registered trademark symbol */}
      <text x="250" y="15" fontFamily="Arial, sans-serif" fontSize="8" fill="currentColor">
        ®
      </text>
    </svg>
  );
} 