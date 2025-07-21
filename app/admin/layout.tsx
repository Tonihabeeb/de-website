'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminNavigation from '@/components/admin/AdminNavigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push('/login');
      return;
    }

    if (
      !isLoading &&
      isAuthenticated &&
      user &&
      !['admin', 'super_admin'].includes(user.role)
    ) {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (
    !isAuthenticated ||
    !user ||
    !['admin', 'super_admin'].includes(user.role)
  ) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <h1 className='text-xl font-semibold text-gray-900'>
                Deep Engineering CMS
              </h1>
            </div>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-500'>
                Admin Panel -{' '}
                {user.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </span>
              <a
                href='/'
                className='text-sm text-blue-600 hover:text-blue-800 transition-colors'
              >
                View Site
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <div className='hidden lg:flex lg:flex-shrink-0'>
          <div className='flex flex-col w-64'>
            <div className='flex flex-col h-0 flex-1 bg-white border-r border-gray-200'>
              <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
                <div className='flex items-center flex-shrink-0 px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>
                    Administration
                  </h2>
                </div>
                <nav className='mt-5 flex-1 px-2 space-y-1'>
                  <AdminNavigation />
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        <div className='lg:hidden'>
          <div className='fixed inset-0 flex z-40'>
            <div className='fixed inset-0 bg-gray-600 bg-opacity-75'></div>
            <div className='relative flex-1 flex flex-col max-w-xs w-full bg-white'>
              <div className='absolute top-0 right-0 -mr-12 pt-2'>
                <button
                  type='button'
                  className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                >
                  <span className='sr-only'>Close sidebar</span>
                  <svg
                    className='h-6 w-6 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                <div className='flex-shrink-0 flex items-center px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>
                    Administration
                  </h2>
                </div>
                <nav className='mt-5 px-2 space-y-1'>
                  <AdminNavigation />
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className='flex flex-col w-0 flex-1 overflow-hidden'>
          <main className='flex-1 relative overflow-y-auto focus:outline-none'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
