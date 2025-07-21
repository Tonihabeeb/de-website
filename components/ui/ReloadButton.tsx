'use client';

import { RefreshCw } from 'lucide-react';

interface ReloadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ReloadButton({
  className = '',
  children,
}: ReloadButtonProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleReload}
      className={`inline-flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      aria-label='Reload page'
    >
      <RefreshCw className='w-4 h-4 mr-2' />
      {children || 'Reload'}
    </button>
  );
}
