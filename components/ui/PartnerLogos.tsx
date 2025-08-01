import React from 'react';

interface PartnerLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

// ROSCH INNOVATIONS Logo
export function RoschInnovationsLogo({ className = '', width = 120, height = 40 }: PartnerLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
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
      <text x="5" y="25" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="currentColor">
        ROSCH
      </text>
      
      {/* INNOVATIONS text */}
      <text x="65" y="25" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="300" fill="currentColor">
        INNOVATIONS
      </text>
      
      {/* S-shaped icon with gradient */}
      <g transform="translate(160, 10)">
        <path
          d="M15 10 C25 10, 25 20, 15 30 C5 40, 0 40, 0 40 C0 40, 0 50, 0 50 C0 50, 5 50, 15 50 C25 50, 25 60, 15 70"
          stroke="url(#roschGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Upper dot */}
        <circle cx="8" cy="25" r="1.5" fill="#60A5FA" />
        
        {/* Lower dot */}
        <circle cx="8" cy="55" r="1.5" fill="#34D399" />
      </g>
      
      {/* Registered trademark symbol */}
      <text x="175" y="15" fontFamily="Arial, sans-serif" fontSize="8" fill="currentColor">
        ®
      </text>
    </svg>
  );
}

// Partner logos will be added here one by one 