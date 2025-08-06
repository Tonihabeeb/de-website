'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];

  // Build up the breadcrumb links
  const crumbs = [
    { name: 'Home', href: '/' },
    ...segments.map((seg, idx) => {
      const href = '/' + segments.slice(0, idx + 1).join('/');
      // Capitalize and replace dashes with spaces
      const name = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      return { name, href };
    }),
  ];

  return (
    <nav aria-label='Breadcrumb' className='mb-4 text-sm'>
      <ol className="flex flex-wrap items-center gap-2 text-white">
        {crumbs.map((crumb, idx) => (
          <li key={crumb.href} className='flex items-center'>
            {idx > 0 && <span className='mx-1'>/</span>}
            {idx === crumbs.length - 1 ? (
              <span className='text-primary font-semibold' aria-current='page'>
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className='hover:underline focus:outline-none focus:underline'
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
