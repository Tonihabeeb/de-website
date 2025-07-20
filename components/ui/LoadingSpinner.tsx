import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  const spinner = (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
    />
  );

  if (text) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
        {spinner}
        <p className={`text-sm ${colorClasses[color]}`}>{text}</p>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
}

// Convenience components for common use cases
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="xl" text="Loading..." />
    </div>
  );
}

export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return <LoadingSpinner size={size} color="white" />;
}

export function InlineLoader({ text }: { text?: string }) {
  return <LoadingSpinner size="sm" text={text} />;
} 