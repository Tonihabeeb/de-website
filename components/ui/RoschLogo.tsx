import React from 'react';

interface RoschLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function RoschLogo({ className = '', width = 32, height = 32 }: RoschLogoProps) {
  const isWhite = className.includes('text-white');
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
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
      
      {/* Upper segment of the S shape */}
      <path
        d="M75 20 C85 20, 85 30, 75 40 C65 50, 45 50, 35 50 C25 50, 25 60, 35 60"
        stroke={isWhite ? "currentColor" : "url(#roschGradient)"}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Lower segment of the S shape */}
      <path
        d="M35 60 C45 60, 65 60, 75 60 C85 60, 85 70, 75 80 C65 90, 45 90, 35 90"
        stroke={isWhite ? "currentColor" : "url(#roschGradient)"}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
} 