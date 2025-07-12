'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Technology', href: '/technology' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Deep Engineering - Go to homepage">
            <Image src="/logo.svg" alt="Deep Engineering company logo" height={40} width={120} priority />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8" role="menubar">
            {navigation.map((item) => (
              <li key={item.name} role="none">
                <Link
                key={item.name}
                href={item.href}
                role="menuitem"
                aria-current={pathname === item.href ? 'page' : undefined}
                className={
                  `text-gray-text hover:text-primary transition-colors duration-200 font-medium` +
                  (pathname === item.href ? ' text-primary font-bold underline' : '')
                }
              >
                {item.name}
              </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-text hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-200" role="navigation" aria-label="Mobile navigation">
            <ul className="px-2 pt-2 pb-3 space-y-1" role="menu">
              {navigation.map((item) => (
                <li key={item.name} role="none">
                  <Link
                  key={item.name}
                  href={item.href}
                  role="menuitem"
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="block px-3 py-2 text-gray-text hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
} 